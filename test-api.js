const API_KEY = 'AIzaSyByPWBpTUTF4w1F2xynQbjE2UOdxULF_ng';

async function testGeminiAPI() {
  try {
    // Test gemini-pro
    console.log('🧪 Testando gemini-pro em v1beta...');
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'teste' }] }]
        })
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log('✅ SUCESSO! gemini-pro funciona!');
      console.log('Resposta:', JSON.stringify(data, null, 2).substring(0, 200));
    } else {
      console.log('❌ Erro com gemini-pro:', data.error.message);

      // Test gemini-1.5-flash
      console.log('\n🧪 Testando gemini-1.5-flash em v1beta...');
      const response2 = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'teste' }] }]
          })
        }
      );

      const data2 = await response2.json();

      if (response2.ok) {
        console.log('✅ SUCESSO! gemini-1.5-flash funciona!');
        console.log('Resposta:', JSON.stringify(data2, null, 2).substring(0, 200));
      } else {
        console.log('❌ Erro com gemini-1.5-flash:', data2.error.message);
      }
    }
  } catch (error) {
    console.error('❌ Erro na requisição:', error.message);
  }
}

testGeminiAPI();
