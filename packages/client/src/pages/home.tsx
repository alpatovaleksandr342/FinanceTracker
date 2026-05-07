import { Button } from "@mantine/core";
import React, { useState } from "react";
import { trpc } from "src/main";

export const Home = () => {
  const [nom, setNom] = useState(3);
  const addOne = () => {
    setNom(nom+1)
    console.log(nom);
  };
  const{data} = trpc.auth.getTestData.useQuery()
  return (
    <>
      <div>home{data?.data.label},{nom}</div>
      <Button onClick={addOne}>Прибавить 1</Button>
      {data?(<div>Текущее время:{data.data.time.toString()}</div>):(<div>Сервер не ответил</div>)}
    </>
  );
};
