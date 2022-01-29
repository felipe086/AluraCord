import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import React, { useState } from 'react'
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
                margin-bottom: 32px; 
                margin-top: 5px;
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
  const [username, setUsername] = useState('')
  const [dados, setDados] = useState('')
  const route = useRouter()

  const getDados = (value) => {
    fetch(`https://api.github.com/users/${value}`)
      .then((response) => response.json())
      .then((data) => {
        setDados(data);
      })
      .catch((erro) => console.log(erro))
  }

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
          backgroundImage: appConfig.images.backgroundImg,
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
            onSubmit={(event) => {
              event.preventDefault()
              route.push(`/chat?username=${username}`)
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center',
            }}
          >
            <Title tag="h2">Seja bem-vindo!</Title>

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
              onChange={(event) => {
                const value = event.target.value
                setUsername(value)
                getDados(value)
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
              minHeight: '270px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '5%',
                marginBottom: '16px',
              }}
              src={username.length > 2 ? `https://github.com/${username}.png` : appConfig.images.noPic}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[100],
                padding: '3px 10px',
              }}
            >
              {username}
            </Text>
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[100],
                padding: '3px 10px',
              }}
            >
              {dados.name}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}