import './App.css';
import api  from './Api/Api.js'
import ShowPub from './components/Show';
import Add from './components/Add'
import AddTag from './components/AddTag';
import { Heading,
         Flex,
         Box,
         Text,
         List,
         ListItem,
         Badge,
         Spacer,
         Divider,
         InputGroup,
         Input,
         InputRightElement,
         Select,
         Button,
        } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

        
function App (){

      const [news, setNews] = useState([])

     useEffect(() => {
        api.get('news').then(({data}) => {
          
          setNews(data.results);

        });

       //eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);



      const [message, setMessage] = useState('');
      const [val, setVal] = useState('name');
     
  
      const handleChangeSearch = event => {
          setMessage(event.target.value);
      }

      const handleClickSearch = event => {
          event.preventDefault();
      
          const sendGetRequest = async () => {
            var join_url = 'news/?' + val + '=' + message
           
            api.get(join_url).then(({data}) => {
          
              setNews(data.results);   
            });
          };        
          sendGetRequest();
        };
  
    return(

            <Box bg='#F7FAFC'>
            <Flex p={4} bg='#EDFDFD'>
              <Box >
            <Heading as='h2' size='xl'>Blog</Heading>
            </Box>
            <Spacer />
            <Box w='500px' >
    <InputGroup >
    <Box>
    <Input id="message" value={message} onChange={handleChangeSearch} placeholder='Buscar' variant='flushed'/>

    <InputRightElement width='10.5rem'>  
    <Select variant='flushed' value={val} placeholder='Selecione pelo que quer buscar' onChange={(e) => setVal(e.target.value)}>
    <option value='name'>Titulo da noticia</option>
    <option value='tags__name'>Tag</option>
    </Select>
    
    <Button  colorScheme='linkedin' onClick={handleClickSearch}>Buscar</Button>
    </InputRightElement>
    </Box>
    </InputGroup>
    </Box>
            <Spacer />
            <Add />
            <AddTag />

 </Flex>
<Divider/>



          <List>
          {news.map((n) =>(
          <ListItem key={n.id}>
            <Box m={6} p={2} border='1px'>
            <Flex >
             <Heading as='h3' size='lg'>
                {n.name}
              </Heading>
              </Flex>
              <Text fontSize='xl' noOfLines={[1, 2, 3]}>
                {n.content}
              </Text>
              <Flex>
              <Box>
              {n.tags.map((t) =>
              <Badge>{t}</Badge>
              )}
              </Box>
              </Flex>
              <Spacer/>
              <Flex>
              <Box>
              <Text>
                Publicação: {n.publication_date}
              </Text>
              </Box>
              </Flex>
              <Spacer/>
              <Flex>
              <Box>
              <Text>
                Edição: {n.edition_date}
              </Text>
              </Box>
                <Spacer />
              <Box>
              <ShowPub n = {n} />
              </Box>
              
              </Flex>
              </Box>
            
            </ListItem>
          ))}   
          </List>
          </Box>
    );
}
export default App;