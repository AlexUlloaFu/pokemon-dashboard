import Image from "next/image";
import React from "react";
import axios from "axios";
import { PokemonData } from "../types/PokemonTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function PokemonCard({ url }: { url: string }) {
  const pokemonData: PokemonData = {
    name: "",
    spriteURL: "",
    types: [],
    height: "0",
    weight: "0",
    moves: [],
  };
  try {
    const res = await axios.get(url);
    const data = res.data;
    pokemonData.name = data.name;
    pokemonData.height = data.height;
    pokemonData.weight = data.weight;
    pokemonData.spriteURL = data.sprites.other["official-artwork"].front_default;
    pokemonData.moves = data.moves?.slice(0, 4).map((moveSlot: any) => {
      return moveSlot.move.name;
    });
    pokemonData.types = data.types.map((typeSlot: any) => {
      return typeSlot.type.name;
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error("ERROR --> Could not fetch pokemon data from API: ", e.message);
    } else {
      console.error("ERROR --> An unknown error occurred.");
    }
  }
  return (
    <Card className="col-span-1 animate-fade-in-up">
      <CardHeader>
        <CardTitle className="uppercase">{pokemonData.name}</CardTitle>
        <div className="flex space-x-2 justify-end">
          {pokemonData.types.map((type) => (
            <div key={type}>{type}</div>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <Image alt="Pokemon artwork" src={pokemonData.spriteURL} width={237} height={237} />
        <p className="font-semibold mt-1">Moves : </p>
        <div className="grid grid-cols-2 gap-2 my-2 ">
          {pokemonData.moves &&
            pokemonData.moves.map((move) => (
              <div key={move} className="bg-slate-200 rounded px-1 text-center">
                {move}
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default PokemonCard;
