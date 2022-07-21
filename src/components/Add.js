import api from '../Api/Api';
import {useEffect, useState } from 'react';
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
    Textarea,
    useDisclosure,
    Spacer,
    Checkbox, 
    CheckboxGroup, 
    Stack,
    useToast
  } from '@chakra-ui/react'
import {AddIcon} from '@chakra-ui/icons'

function Add() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [tags, setTags] = useState([])

    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [pub, setPub] = useState('');
    const [ed, setEd] = useState('');
    const [tag, setTag] = useState([]);

    const toast = useToast()


    useEffect(() => {

      api.get('tags').then(({data}) => {
          
        setTags(data.results);

      });
//eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChangeName = event => {
      setName(event.target.value);
  }
  const handleChangeContent = event => {
    setContent(event.target.value);
}
const handleChangePub = event => {
  setPub(event.target.value);
}
const handleChangeEd = event => {
setEd(event.target.value);
}
const handleChangeTag= event => {
  setTag(event.target.value);
}

    const handleClickAdd = event => {
      event.preventDefault();
      console.log(name, content, pub, ed, tag)
      api.post('news_ops/', {
        name: name,
        content: content,
        publication_date: pub,
        edition_date: ed,
        tags: tag
      }).then(function (response) {
        toast({
          title: 'Publicação adicionada com sucesso',          
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

      <Button leftIcon={<AddIcon />} onClick={onOpen}
  colorScheme='whatsapp'
  size='lg'
 > Publicação</Button>
</Box>
<Modal isOpen={isOpen} onClose={onClose} size='6xl'>
          <ModalOverlay />
          <ModalContent>
          
            <ModalCloseButton />
            <ModalBody>
            <FormControl>
            <FormLabel>Titulo da Publicação</FormLabel>
            <Input onChange={handleChangeName} value={name}/>
            <FormLabel>Conteúdo</FormLabel>
            <Textarea onChange={handleChangeContent} value={content} placeholder='Escreva sua publicação aqui' />
            <FormLabel>Data de publicação</FormLabel>
            <Input onChange={handleChangePub} value={pub}
            placeHolder="Selecione data e hora"
              size="md"
                backgroundColor="#ffffff"
                type="datetime-local"
              />
            <FormLabel>Data de edição</FormLabel>
            <Input onChange={handleChangeEd} value={ed}
              placeHolder="Selecione data e hora"
                size="md"
                backgroundColor="#ffffff"
                type="datetime-local"
    />
            <FormLabel>Tags</FormLabel>
            <CheckboxGroup colorScheme='green' onChange={handleChangeTag} >
            <Stack spacing={[1, 5]} direction={['column', 'row']}>
        {tags.map((t) =>  (
            <Checkbox value={t.id}>{t.name}</Checkbox>

        ))}
              </Stack>
</CheckboxGroup>
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

export default Add;