import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, context } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'URL da imagem é obrigatória' },
        { status: 400 }
      );
    }

    // Verificar se a chave da OpenAI está configurada
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey.trim() === '') {
      return NextResponse.json(
        { 
          error: 'Chave da OpenAI não configurada',
          needsConfig: true,
          message: 'Configure sua chave OPENAI_API_KEY para usar esta funcionalidade'
        },
        { status: 400 }
      );
    }

    // Fazer análise com OpenAI Vision API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: context || 'Analise esta imagem de alimento e identifique: 1) Nome específico do alimento ou prato, 2) Quantidade aproximada de calorias totais. Seja preciso e detalhado na identificação. Responda APENAS no formato: "ALIMENTO: [nome] | CALORIAS: [número]"'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ],
        max_tokens: 300
      })
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      console.error('Erro OpenAI:', errorData);
      
      // Tratamento específico para erro de autenticação
      if (openaiResponse.status === 401) {
        return NextResponse.json(
          { 
            error: 'Chave da OpenAI inválida',
            needsConfig: true,
            message: 'A chave OPENAI_API_KEY configurada é inválida. Verifique suas credenciais.'
          },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        { error: 'Erro ao analisar imagem com a OpenAI', details: errorData },
        { status: 500 }
      );
    }

    const data = await openaiResponse.json();
    const analysis = data.choices[0]?.message?.content || '';

    return NextResponse.json({
      success: true,
      analysis: analysis
    });

  } catch (error) {
    console.error('Erro na API de análise:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', details: String(error) },
      { status: 500 }
    );
  }
}
