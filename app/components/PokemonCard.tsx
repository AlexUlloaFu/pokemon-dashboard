import Image from "next/image";
import { PokemonData } from "../types/PokemonTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function PokemonCard({ pokemonData }: { pokemonData: PokemonData }) {
  return (
    <Card
      className={`col-span-1 animate-fade-in-up relative overflow-hidden bg-transparent transition-transform hover:border-blue-600 hover:border-2 hover:scale-110`}
    >
      <div
        style={{ backgroundColor: pokemonData.color }}
        className="absolute inset-0 -z-10  h-full w-full opacity-30 blur-3xl"
      ></div>

      <CardHeader>
        <CardTitle className="uppercase">{pokemonData.name}</CardTitle>
        <div className="flex space-x-1 justify-end">
          {pokemonData.types.map((type) => {
            return (
              type && (
                <Image
                  key={type}
                  alt="Pokemon Type"
                  src={type}
                  width={79 / 1.5}
                  height={27 / 1.5}
                  className="mt-2"
                  defaultValue={""}
                />
              )
            );
          })}
        </div>
      </CardHeader>
      <CardContent>
        <Image
          alt="Pokemon artwork"
          src={pokemonData.spriteURL}
          width={237}
          height={237}
          defaultValue={""}
        />
        <p className="font-semibold mt-1">Moves : </p>
        <div className="grid grid-cols-2 gap-2 my-2 ">
          {pokemonData.moves &&
            pokemonData.moves.map((move) => (
              <div
                key={move}
                className="bg-slate-200 rounded px-1 text-center text-clip text-nowrap overflow-hidden"
              >
                {move}
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default PokemonCard;
