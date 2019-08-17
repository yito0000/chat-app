## Configure the request mapping template.
```
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
    "expression": "attribute_not_exists(#id)",
    "expressionNames": {
      "#id": "id",
    },
  },
}
```

## Configure the response mapping template.
```
$util.toJson($context.result)
```
