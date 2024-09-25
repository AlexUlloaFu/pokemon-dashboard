import axios from "axios";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { Axios } from "@/lib/axios";
import { PokemonData } from "./types/PokemonTypes";
import PokemonsPagination from "./components/PokemonsPagination";
import PokemonCard from "./components/PokemonCard";
import UserProfile from "./components/UserProfile";
import SearchPokemon from "./components/SearchPokemon";
import Link from "next/link";

type Props = {
  searchParams?: {
    page?: string;
    search?: string;
  };
};

export default async function Home({ searchParams }: Props) {
  const session = await getSession();
  if (!session) redirect("/login");

  const limit = 20;
  const search = searchParams?.search ?? null;
  const page = parseInt(searchParams?.page ?? "") || 1;
  const offset = (page - 1) * limit;
  const pokemonsData: Array<PokemonData> = [];
  let numberOfPages = 1;

  try {
    if (search) {
      //SEARCH BY THE ENDPOINT /pokemon/nameOfPokemon
      const res = await Axios.get(`/pokemon/${search}`);
      const pokemonData = await getPokemonCardDataFromRawData(res.data);
      pokemonsData.push(pokemonData);
    } else {
      //GET ALL POKEMONS /pokemon
      const res = await Axios.get("/pokemon", { params: { limit, offset } });
      numberOfPages = Math.ceil(res.data.count / limit);
      for (const pokemonBasicData of res.data.results) {
        const res = await axios.get(pokemonBasicData.url);
        const pokemonData = await getPokemonCardDataFromRawData(res.data);
        pokemonsData.push(pokemonData);
      }
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error("ERROR --> Could not fetch pokemons from API: ", e.message);
    } else {
      console.error("ERROR --> An unknown error occurred.");
    }
  }

  return (
    <div className="">
      <main className="flex justify-center flex-col items-center space-y-5">
        <div className="w-full flex justify-center ">
          <Link href={"/"}>
            <h1 className="text-3xl lg:text-[60px] font-pokemon tracking-widest text-yellow-400 ">
              Pokémon
            </h1>
          </Link>
          <div className="flex justify-end items-baseline w-full ">
            <UserProfile />
          </div>
        </div>
        <h1 className="text-xl font-bold">Dashboard</h1>

        <SearchPokemon />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {pokemonsData && pokemonsData.length > 0 ? (
            pokemonsData.map((pokemonData: PokemonData) => (
              <PokemonCard key={pokemonData.name} pokemonData={pokemonData} />
            ))
          ) : (
            <p className="col-span-4">{`Couldn't get any pokemon :(`}</p>
          )}
        </div>
        <div>{numberOfPages > 1 && <PokemonsPagination numberOfPages={numberOfPages} />}</div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mt-5">
        <p>Made by Alejandro Ulloa </p>
      </footer>
    </div>
  );
}

const getPokemonCardDataFromRawData = async (rawData: any) => {
  const pokemonData: PokemonData = {
    name: "",
    spriteURL: "",
    types: [],
    height: "0",
    weight: "0",
    color: "",
    moves: [],
  };
  const resSpecies = await axios.get(rawData.species.url);

  pokemonData.name = rawData.name;
  pokemonData.height = rawData.height;
  pokemonData.weight = rawData.weight;
  pokemonData.color = resSpecies.data.color.name;
  pokemonData.spriteURL = rawData.sprites.other["official-artwork"].front_default;
  pokemonData.moves = rawData.moves?.slice(0, 4).map((moveSlot: any) => {
    return moveSlot.move.name;
  });
  for (const typeSlot of rawData.types) {
    const res = await axios.get(typeSlot.type.url);
    const typeSprite = res.data.sprites["generation-iii"]["colosseum"].name_icon;
    pokemonData.types.push(typeSprite);
  }

  return pokemonData;
};
