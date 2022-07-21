import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Box,
    Spacer,
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    Input,
    useToast,
    Checkbox, 
    CheckboxGroup, 
    Stack,
  } from '@chakra-ui/react'
import api from '../Api/Api'
import { useEffect, useState } from 'react';
function ShowPub(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    var Url = 'news_ops/' + props.n.id + '/'
    const [tags, setTags] = useState([])
    
    
    useEffect(() => {

      api.get('tags').then(({data}) => {
          
        setTags(data.results);

      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


    const handleDeletePub = event => {
     api.delete(Url).then(function (response) {
        toast({
          title: 'Publicação deletada com sucesso',          
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      })
      .catch(function (error) {
        toast({
          title: 'Erro', 
          description: error,         
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        console.log(error);
      });
  }

              const [name, setName] = useState('');
              const [content, setContent] = useState('');
              const [pub, setPub] = useState('');
              const [ed, setEd] = useState('');
              const [tag, setTag] = useState([]);
              

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

            const handleClickAlter = event => {
              event.preventDefault();
              console.log(name, content, pub, ed)
              api.put(Url, {
                name: name,
                content: content,
                publication_date: pub,
                edition_date: ed,
                tags: tag
              }).then(function (response) {
                toast({
                  title: 'Publicação Salva com sucesso',          
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                })
                setTimeout(() => {
                  window.location.reload()
                }, 1000);   
              })
              .catch(function (error) {
                console.log(error);
              });
                 
            }
        



    return (
      <>
        <Button onClick={onOpen} colorScheme='linkedin'>Ver Mais</Button>
        
        <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>

            <Editable 
             defaultValue={props.n.name}>
              <EditablePreview />
              <EditableInput onChange={handleChangeName} value={name}/>
            </Editable>
              
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>


              <Editable              
               defaultValue={props.n.content}>
                <EditablePreview />
                <EditableTextarea size='full' onChange={handleChangeContent} value={content}/>
              </Editable>
                          
            <Box>
            <Input 
                onChange={handleChangePub} value={pub}
                defaultValue={props.n.pub}
                size="md"
                backgroundColor="#ffffff"
                type="datetime-local"
    />         
                
            <Input 
                onChange={handleChangeEd} value={ed}
                defaultValue={props.n.ed}
                size="md"
                backgroundColor="#ffffff"
                type="datetime-local"
    />
              </Box>
              <Spacer />
              <CheckboxGroup colorScheme='green' onChange={handleChangeTag} >
            <Stack spacing={[1, 5]} direction={['column', 'row']}>
        {tags.map((t) =>  (
            <Checkbox value={t.id}>{t.name}</Checkbox>

        ))}
              </Stack>
</CheckboxGroup>
              <Spacer />
              </ModalBody>
              <Spacer />
            <ModalFooter>
              <Box>
              <Button colorScheme='whatsapp' mr={3} onClick={handleClickAlter}>
                Salvar
              </Button>
            </Box><Box>
              <Button colorScheme='red' mr={3} onClick={handleDeletePub}>
                Deletar
              </Button>
              
            </Box>
              <Box>
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

export default ShowPub;