describe("checkSpam", function () {
  it('"buy ViAgRA now" içinde spam arıyor', function () {
    assert.isTrue(checkSpam('buy ViAgRA now'));
  });

  it('"free xxxxx" içinde spam arıyor', function () {
    assert.isTrue(checkSpam('free xxxxx'));
  });

  it('"innocent rabbit" içinde spam bulamaması lazım', function () {
    assert.isFalse(checkSpam('innocent rabbit'));
  });
});