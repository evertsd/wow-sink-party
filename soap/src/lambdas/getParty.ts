const okResponse = (message: string) => ({
  statusCode: 200,
  body: JSON.stringify({ message }),
});

export const handler = async (event: any) => {
  const partyId = event.pathParameters.id;

  console.log(JSON.stringify(event, null, 2));
  console.log(process.env.MESSAGE);
  return okResponse(partyId);
};
