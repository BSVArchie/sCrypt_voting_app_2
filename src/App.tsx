import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, Box, Button, Typography } from '@mui/material';
import { PandaSigner, ScryptProvider, Scrypt, toByteString } from 'scrypt-ts';
import { Voting2 } from './contracts/voting2';

function App() {

  const signerRef = useRef<PandaSigner>()
  const [error, setError] = useState('')
  const [contract, setContract] = useState<Voting2>()

  async function fetchContract() {

  }

  useEffect(() => {
    const provider = new ScryptProvider()
    const signer = new PandaSigner(provider)

    signerRef.current = signer
  })

  async function vote(e: any) {
    try {
      const instance = await Scrypt.contractApi.getLatestInstance(
        Voting2,
        {
          txId: 'dd464f0575c4ea4ce49c3a77fe625b34342bd78c8e6d02e393885a7ffd117ef2',
          outputIndex: 0
        }
      )
      setContract(instance)
      console.log(instance)
    } catch(error: any) {
      console.log("error while fetching contract: ", error)
      setError(error.message)
    }

    const signer = signerRef.current as PandaSigner

    if (contract && signer) {
      const { isAuthenticated, error} = await signer.requestAuth()
      if (!isAuthenticated) {
        throw new Error(error)
      }

      await contract.connect(signer)

      const nextInstance = contract.next()

      const candidatateName = e.target.name
      if (candidatateName == 'iPhone') {
        nextInstance.candidates[0].votesRecieved++
      } else if (candidatateName == 'Android') {
        nextInstance.candidates[1].votesRecieved++
      }

      contract.methods.vote(
        toByteString(candidatateName, true),
        {
          next: {
            instance: nextInstance,
            balance: contract.balance
          }
        }
      ).then(result => {
        console.log(result.tx.id)
      }).catch(e => {
        setError(e.message)
        console.error(e)
      })

    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <TableContainer
        component={Paper}
        variant='outlined'
        style={{ width: 1200, height: "80vh", margin: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>
                  <Typography variant='h1'>
                    iPhone
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                <Typography variant='h1'>
                    Android
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'>
                  <Box>
                    <Box
                      sx = {{
                        height: 200,
                      }}
                      component="img"
                      alt={"iPhone"}
                      src={'${process.env.PUBLIC_URL}/${"iPhone"}.png'}
                      />
                  </Box>
                </TableCell>
                <TableCell align='center'>
                  <Box>
                    <Box
                      sx = {{
                        height: 200,
                      }}
                      component="img"
                      alt={"Android"}
                      src={'${process.env.PUBLIC_URL}/${"Android"}.png'}
                      />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'>
                  <Box>
                    <Typography variant={"h2"}>
                      ToDo
                    </Typography>
                    <Button
                    variant='text'
                    name='iPhone'
                    onClick={vote}
                    >
                      👍
                    </Button>
                  </Box>
                </TableCell>
                <TableCell align='center'>
                  <Box>
                    <Typography variant={"h2"}>
                      ToDo
                    </Typography>
                    <Button
                    variant='text'
                    name='Android'
                    onClick = {vote}
                    >
                      👍
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>

          </Table>

        </TableContainer>
      </header>
    </div>
  );
}

export default App;
