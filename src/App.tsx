import { ChangeEvent, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { Card } from './components/card'
import { Button } from './components/button'
import api from './services/api'
import logo from './assets/logo.png'
import './App.css'

interface DigimonProps{
  name: string;
  img: string;
  level: string;
}

function App() {
  const [searchText, setSearchText]= useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const [filtered, setFiltered] = useState<DigimonProps[]>([])
  const [digimonList, setDigimonList]=useState<DigimonProps[]>([])

  const [modalContent, setModalContent] = useState({
    name: '', 
    img: '',
    level: ''
  })
  
  // Buscar dados dos digimons
  function getData(){
    api.get("https://digimon-api.vercel.app/api/digimon").then((response)=>{
      setDigimonList(response.data)
      setFiltered(response.data)
    })
  }

  // Buscar dados dos digimons quando abrir o app
  useEffect(()=>{
    getData()
  },[])

   // Filtrar a lista de digimon com o que usuário pesquisar
   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => { 
    const searchTerm = e.target.value;
    setSearchText(searchTerm)

    if(String(e.target.value).length === 0){
      setFiltered(digimonList)
      return;
    }

    const filteredItems = digimonList.filter((d =>
      d.name.toLowerCase().includes(searchText.toLowerCase())
    ))

    setFiltered(filteredItems);
  }  

  // Abrir modal
  const openModal = (name: string, img: string, level: string) => {
    setModalIsOpen(true)
    setModalContent({name, img, level})
  }

  return (
    <>
      <div className="background">
        <div className='logo-container'>
          <img className="logo" src={logo} alt="" />
        </div>
        <div className="search-container">
          <input value={searchText} onChange={handleInputChange} className="search-bar" placeholder='Buscar' type="text" />
        </div>
        <div className="button-container">
          <Button text="Todos"></Button>
          <Button text="Fresh"></Button>
          <Button text="Training"></Button>
          <Button text="Rookie"></Button>
          <Button text="Chapion"></Button>
          <Button text="Mega"></Button>
          <Button text="Ultimate"></Button>
        </div>
        <div className="card-list">
          {filtered.map((digimon)=>(
            <Card key={digimon.name} name={digimon.name} img={digimon.img} onClick={() => openModal(digimon.name, digimon.img, digimon.level)}></Card>
          ))}
        </div>
      </div>

      <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Modal"
          className="modal"
      >
        <div className="modal-content">
          <div className="modal-title">
            <span>{modalContent.name}</span>
            <span onClick={() => setModalIsOpen(false)} style={{ cursor: 'pointer', color: '#000'}}>X</span>
          </div>
          <img src={modalContent.img} alt="" />
          <div className='modal-description'>
            <span className='modal-level'>{modalContent.level}</span>
            <p><span style={{ fontWeight: 'bold', marginRight: '10px' }}>Descrição:</span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi possimus ipsum culpa suscipit. Laudantium perferendis rerum laborum enim corporis tenetur itaque, consequatur porro ex aut voluptatem laboriosam modi inventore nemo.</p>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default App
