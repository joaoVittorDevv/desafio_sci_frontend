import api from '../Api/Api';
import { useState } from 'react';
import { 

    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Box,
    Input,

    useDisclosure,
    Spacer,

    useToast
  } from '@chakra-ui/react'
import {AddIcon} from '@chakra-ui/icons'

function AddTag() {
    const { isOpen, onOpen, onClose } = useDisclosure()


    const [name, setName] = useState('');

    const toast = useToast()



    const handleChangeName = event => {
      setName(event.target.value);
  }
  
    const handleClickAdd = event => {
      event.preventDefault();
      console.log(name)
      api.post('tags/', {
        name: name,

      }).then(function (response) {
        toast({
          title: 'Tag adicionada com sucesso',          
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setTimeout(() => {
          window.location.reload()
        }, 2000);   
      })
      .catch(function (error) {
        console.log(error);
      });
         
    }

    return(
<>
<Box>

      <Button  leftIcon={<AddIcon />} onClick={onOpen}
  colorScheme='whatsapp'
  size='lg'> Tag</Button>
</Box>
<Modal isOpen={isOpen} onClose={onClose} size='6xl'>
          <ModalOverlay />
          <ModalContent>
          
            <ModalCloseButton />
            <ModalBody>
            <FormControl>
            <FormLabel>Nome da Tag</FormLabel>
            <Input onChange={handleChangeName} value={name}/>
            </FormControl>
            </ModalBody>
              <ModalFooter>
              <Spacer />
              <Box>
              <Button onClick={handleClickAdd} colorScheme='whatsapp' mr={3} >
                Adicionar
              </Button>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Fechar
              </Button>
            </Box>
            </ModalFooter>
          </ModalContent>
        </Modal>
</>
    )
}

export default AddTag;