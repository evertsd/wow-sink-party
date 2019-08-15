describe('buffer', () => {
  it('is a test', () => {
    const encoding = 'base64';
    const testString = 'testString';

    const buffer = Buffer.from(testString);
    const encoded = buffer.toString(encoding);

    const readBuffer = Buffer.from(encoded, encoding);

    expect(testString).toBe(readBuffer.toString());
  });
});
