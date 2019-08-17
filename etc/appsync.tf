resource "aws_dynamodb_table" "MessageTable" {
  name           = "MessageTable"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"
  range_key      = "createDate"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "createDate"
    type = "S"
  }

}

resource "aws_iam_role" "chat_ap_role" {
  name = "chat_app_role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "appsync.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "chat_app_policy" {
  name = "chat_app_policy"
  role = "${aws_iam_role.chat_ap_role.id}"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "dynamodb:*"
      ],
      "Effect": "Allow",
      "Resource": [
        "${aws_dynamodb_table.MessageTable.arn}"
      ]
    }
  ]
}
EOF
}

resource "aws_appsync_graphql_api" "chat_api" {
  authentication_type = "API_KEY"
  name                = "tf_chat_api"
  schema              = <<EOF
input CreateMessageInput {
	text: String
	username: String
}

input DeleteMessageInput {
	id: ID!
	createDate: AWSDateTime!
}

type Message {
	id: ID!
	text: String
	username: String
	createDate: AWSDateTime
}

type MessageConnection {
	items: [Message]
	nextToken: String
}

type Mutation {
	createMessage(input: CreateMessageInput!): Message
	updateMessage(input: UpdateMessageInput!): Message
	deleteMessage(input: DeleteMessageInput!): Message
}

type Query {
	getMessage(id: ID!, createDate: AWSDateTime!): Message
	listMessages(filter: TableMessageFilterInput, limit: Int, nextToken: String): MessageConnection
}

type Subscription {
	onCreateMessage(
		id: ID,
		text: String,
		username: String,
		createDate: AWSDateTime
	): Message
		@aws_subscribe(mutations: ["createMessage"])
	onUpdateMessage(
		id: ID,
		text: String,
		username: String,
		createDate: AWSDateTime
	): Message
		@aws_subscribe(mutations: ["updateMessage"])
	onDeleteMessage(
		id: ID,
		text: String,
		username: String,
		createDate: AWSDateTime
	): Message
		@aws_subscribe(mutations: ["deleteMessage"])
}

input TableBooleanFilterInput {
	ne: Boolean
	eq: Boolean
}

input TableFloatFilterInput {
	ne: Float
	eq: Float
	le: Float
	lt: Float
	ge: Float
	gt: Float
	contains: Float
	notContains: Float
	between: [Float]
}

input TableIDFilterInput {
	ne: ID
	eq: ID
	le: ID
	lt: ID
	ge: ID
	gt: ID
	contains: ID
	notContains: ID
	between: [ID]
	beginsWith: ID
}

input TableIntFilterInput {
	ne: Int
	eq: Int
	le: Int
	lt: Int
	ge: Int
	gt: Int
	contains: Int
	notContains: Int
	between: [Int]
}

input TableMessageFilterInput {
	id: TableIDFilterInput
	text: TableStringFilterInput
	username: TableStringFilterInput
	createDate: TableStringFilterInput
}

input TableStringFilterInput {
	ne: String
	eq: String
	le: String
	lt: String
	ge: String
	gt: String
	contains: String
	notContains: String
	between: [String]
	beginsWith: String
}

input UpdateMessageInput {
	id: ID!
	text: String
	username: String
	createDate: AWSDateTime!
}
EOF
}

resource "aws_appsync_datasource" "chat_app_datasource" {
  api_id           = "${aws_appsync_graphql_api.chat_api.id}"
  name             = "MessageTable"
  service_role_arn = "${aws_iam_role.chat_ap_role.arn}"
  type             = "AMAZON_DYNAMODB"

  dynamodb_config {
    table_name = "${aws_dynamodb_table.MessageTable.name}"
  }
}

resource "aws_appsync_api_key" "chat_api_key" {
  api_id  = "${aws_appsync_graphql_api.chat_api.id}"
  expires = "2019-09-03T04:00:00Z"
}

resource "aws_appsync_resolver" "createMessage" {
  api_id      = "${aws_appsync_graphql_api.chat_api.id}"
  field       = "createMessage"
  type        = "Mutation"
  data_source = "${aws_appsync_datasource.chat_app_datasource.name}"

  request_template = <<EOF
{
  "version": "2017-02-28",
  "operation": "PutItem",
  "key": {
    "id": $util.dynamodb.toDynamoDBJson($util.autoId()),
  },
  "attributeValues": {
  	"username": $util.dynamodb.toDynamoDBJson($context.arguments.input.username),
    "text": $util.dynamodb.toDynamoDBJson($context.arguments.input.text),
  	"createDate": $util.dynamodb.toDynamoDBJson($util.time.nowISO8601()),
  },
  "condition": {
    "expression": "attribute_not_exists(#id) AND attribute_not_exists(#createDate)",
    "expressionNames": {
      "#id": "id",
      "#createDate": "createDate",
    },
  },
}
EOF

  response_template = <<EOF
$util.toJson($context.result)
EOF
}

resource "aws_appsync_resolver" "listMessages" {
  api_id      = "${aws_appsync_graphql_api.chat_api.id}"
  field       = "listMessages"
  type        = "Query"
  data_source = "${aws_appsync_datasource.chat_app_datasource.name}"

  request_template = <<EOF
{
  "version": "2017-02-28",
  "operation": "Scan",
  "filter": #if($context.args.filter) $util.transform.toDynamoDBFilterExpression($ctx.args.filter) #else null #end,
  "limit": $util.defaultIfNull($ctx.args.limit, 20),
  "nextToken": $util.toJson($util.defaultIfNullOrEmpty($ctx.args.nextToken, null)),
}
EOF

  response_template = <<EOF
$util.toJson($context.result)
EOF
}