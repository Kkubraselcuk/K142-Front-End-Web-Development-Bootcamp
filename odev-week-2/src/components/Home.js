import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Tr, Th, Td, Input, Button, Select,LoginDiv,HomeDiv,SearchDiv } from './StyledComponents/ScApp';
import { Circles,BallTriangle } from 'react-loader-spinner'
import Film from './Film';


const Home = () => {
    const [people, setPeople] = useState([]);
    const [control, setControl] = useState({
        Iname: '',
        Ipassword: ''
    });
    const [search, setSearch] = useState("");
    const [isLoading, setIsloading] = useState(true);
    const [login, setLogin] = useState(
        {
            name: 'admin',
            password: 'admin',
            isAuth: false
        }
    );

    const getPeople = async () => {
        const res = await axios.get('https://swapi.dev/api/people');
        setPeople(res.data.results);
        console.log(res.data.results);
    };

    const deleteItem = (i) => {
        console.log(i);
        setPeople(
            people.filter((item, index) => {
                if (index !== i) {
                    return item;
                }
            }, ...people)
        );
    };

    const setName = (e) =>{
        setControl({
            ...control,
            Iname: e.target.value
        })
    };

    const setPassword = (e) =>{
        setControl({
            ...control,
            Ipassword: e.target.value
        })
    };

    const loginFunc = () => {
        console.log("Iname: " +control.Iname);
        console.log("Iname: " +control.Ipassword);
        console.log("name: "+login.name);
        if(control.Iname == login.name){
            if(control.Ipassword == login.password){
                setLogin({
                    ...login,
                    isAuth: true
                })
            }else{
                alert("yanlış şifre");
            }
        }else{
            alert("yanlış ad");
        }
        
    };

    useEffect(() => {
        getPeople();
    }, []);

    return (
        <HomeDiv>
            {!login.isAuth ? (
                <LoginDiv>
                    <Input type="text" placeholder="name" onChange={setName}></Input><br></br>
                    <Input placeholder="password"  onChange={setPassword}></Input><br></br>
                    <Button onClick={loginFunc} >Login</Button>
                </LoginDiv>
            ) : (
                <>
                    <SearchDiv>
                        <Input
                            type="text"
                            id="search-input"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                        />
                        <Select
                            id="gender"
                            name="gender"
                            onChange={(e) => setSearch(e.target.value)}>
                            <option value=""> All </option>
                            <option value="male"> Male </option>
                            <option value="female"> Female </option>
                            <option value="n/a"> N/A </option>
                        </Select>
                    </SearchDiv>
                    {!isLoading ? (
                        <BallTriangle
                            height="40"
                            width="40"
                            radius="9"
                            color='green'
                            ariaLabel='three-dots-loading'
                            wrapperStyle
                            wrapperClass
                        />
                    ) : (<>
                        <Table>
                            <thead>
                                <Tr>
                                    <Th>Title</Th>
                                    <Th>Height</Th>
                                    <Th>Gender{" "}

                                    </Th>
                                    <Th>Films</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </thead>
                            <tbody>
                                {
                                    people.filter((Item) => {
                                        if (search == "") {
                                            return Item;
                                        } else if (Item.name.toLowerCase().includes(search.toLowerCase())) {
                                            return Item;
                                        }
                                    })
                                        .map((item, index) => (

                                            <Tr>
                                                <Td>{item.name}</Td>
                                                <Td>{item.height}</Td>
                                                <Td>{item.gender}</Td>
                                                <Td>
                                                    {item.films.map((url, index) => (
                                                    <Film url={url}/>
                                                    ))}
                                                </Td>
                                                
                                                <Td><Button onClick={() => deleteItem(index)}>Delete</Button></Td>
                                            </Tr>
                                        ))
                                }
                            </tbody>
                        </Table>
                        </>
                    )}
                    
                </>
            )}
            {/* <button onClick={getPeople}>Click People</button>
                <button onClick={getFilms}>Click Films</button> */}


        </HomeDiv>
    );
};

export default Home;