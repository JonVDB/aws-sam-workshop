export const lambdaHandler = async event => {
    console.log("This line was logged tothe console during Lambda-function execution.");
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello World!" }),
    };
}
