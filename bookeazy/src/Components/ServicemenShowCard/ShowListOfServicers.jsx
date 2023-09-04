import React, {useState, useEffect} from "react";
import { faker } from "@faker-js/faker";
import ServicemenShowCard from "./ServicemenShowCard";
import style from "./ShowListOfServicers.module.css";

function ShowListOfServicers() {
  const [servicePeople, setServicePeople] = useState([]);
  useEffect(() => {
    let people = [];
    for (let i = 0; i < 10; i++) {
      let person = {};
      person.image = faker.image.avatar();
      person.name = faker.person.fullName();
      person.about = faker.person.bio();
      people.push(person);
    }
    // console.log(people);
    setServicePeople(people);
  }, []);
  return (
    <div className={style.listServicers}>
      {servicePeople.map((person,index) => (
        <ServicemenShowCard
          key={index}
          index={index}
          name={person.name}
          image={person.image}
          rating={Math.floor(Math.random() * 6)}
          about={person.about}
        />
      ))}
      {/* <ServicemenShowCard name="Manav Daggula" rating="4" image={person1Image} />
      <ServicemenShowCard name="Manav Daggula" rating="4" image={person1Image} />
      <ServicemenShowCard name="Manav Daggula" rating="4" image={person1Image} />
      <ServicemenShowCard name="Manav Daggula" rating="4" image={person1Image} />
      <ServicemenShowCard name="Manav Daggula" rating="4" image={person1Image} /> */}
    </div>
  );
}

export default ShowListOfServicers;