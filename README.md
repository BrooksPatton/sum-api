# sum-api

An API that sums two numbers together and returns the result

# How to use

## Base URL

The base url is https://sum-api.herokuapp.com

All subsequent api requests will be given as such

`/api/v1/health`

This means that in order to get the health of the api, you would need to send your request to the following URL.

`https://sum-api.herokuapp.com/api/v1/health`

## JSON Schemas

The JSON examples provided are not the actual objects to send, but rather the schema. The schema is a way to show what should be sent. For example, take the following schema.

```json
{
  "type" : STRING
}
```

This means that the object will have the key **type** and the value is of type **string**. Note that _STRING_ will not be sent in, but should be replaced with data of your choosing (or of the servers choosing).

## Types

The following types are allowed

* addition

All other types will result in an error

## Methods

The following HTTP methods are allowed

* POST

All other methods will result in an error

# API endpoints

## Check the health

Send a GET request to /api/v1/health to get a quick status message.

INPUT: Nothing required

OUTPUT: JSON

```json
{
  "status": STRING
}
```

## Get the sum of two numbers

Send a GET request to /api/v1/health to get a quick status message.

INPUT: JSON
```json
{
  "type" : STRING,
  "num1" : NUMBER,
  "num2" : NUMBER
}
```

OUTPUT: JSON

```json
{
  "status": STRING
}
```

# Errors

**Code 1** - The payload was incorrect. Please verify that you are sending the correct looking object and try again.

**Code 2** - The type requested is not allowed. Please check the documentation for what types you can use.

**Code 3** - Both sums to be added together must be in the payload.

**Code 4** - Both sums to be added together must be numbers.
