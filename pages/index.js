import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import React from 'react'
import { useRouter } from 'next/router'
import appConfig from '../config.json'

function Title(props) {
    const Tag = props.tag || 'h1'
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                color: ${appConfig.theme.colors.primary['500']};
                font-size: 24px;
                font-weight: 600;
                }
            `}</style>
        </>
    )
}

// function HomePage() {
//     return (
//         <div>
//             <GlobalStyle />
//             <Title tag="h2">Boas vindas de volta!</Title>
//             <h2>Discord - Alura Matrix</h2>
//         </div> 
        
//     )
//   }
// export default HomePage

export default function PaginaInicial() {
    const [username, setUsername] = React.useState('')
    const route = useRouter()
    const noPic = 'https://preview.redd.it/oc4d5zck25f71.png?width=516&format=png&auto=webp&s=7973d616398483a47a711f373339e0da970b30a6'

    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
            //  backgroundColor: appConfig.theme.colors.primary[100],
            backgroundImage: 'url(https://images6.alphacoders.com/911/911401.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '725px',
              borderRadius: '5px', padding: '35px', margin: '75px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.transparent.opacity,
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={function (event){
                // Evita de recarregar a página por completo.
                event.preventDefault()  
                route.push('/chat')
                /* Modo tradicional do navegador
                window.location.href = '/chat' */
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center',
                paddingBottom: '', 
              }}
            >
              <Title tag="h2">Seja bem-vindo!</Title>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', marginTop: '5px', color: appConfig.theme.colors.neutrals[300] }}>
                Piratas do Chapéu de Palha
              </Text>
  
              <TextField
                fullWidth

                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
                placeholder='Insira seu username do GitHub'
                onChange={function handler(event){
                  // Pegando o Valor
                  const value = event.target.value

                  // Trocando o valor da variável
                  // e com o React, atualiza os demais campos
                    setUsername(value) 
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                disabled={username.length < 3}
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                border: '1px solid',
                borderColor: appConfig.theme.colors.primary[600],
                borderRadius: '10px',
                flex: 1,
                minHeight: '250px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '5%',
                  marginBottom: '16px',
                }}
                src={ username.length > 2 ? `https://github.com/${username}.png` : noPic }
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[100],
                  padding: '3px 10px',
                }}
              >
                {/* {username.charAt(0).toUpperCase() + username.slice(1)} */}
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }