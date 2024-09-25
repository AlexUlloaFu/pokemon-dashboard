import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { Axios } from "@/lib/axios";
import { PokemonAPIData } from "./types/PokemonTypes";
import PokemonsPagination from "./components/PokemonsPagination";
import PokemonCard from "./components/PokemonCard";
import UserProfile from "./components/UserProfile";
import SearchPokemon from "./components/SearchPokemon";

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
  let numberOfPages = 1;
  let pokemonsData = [];
  let singlePokemonData = null;

  try {
    if (search) {
      //SEARCH BY THE ENDPOINT /pokemon/nameOfPokemon
      const res = await Axios.get(`/pokemon/${search}`);
      singlePokemonData = res.data;
    } else {
      //GET ALL POKEMONS /pokemon
      const res = await Axios.get("/pokemon", { params: { limit, offset } });
      numberOfPages = Math.ceil(res.data.count / limit);
      pokemonsData = res.data.results;
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
        <div className="w-full flex justify-end">
          <UserProfile />
        </div>
        <h1 className="text-4xl font-bold">{`Pokémon Dashboard`}</h1>
        <SearchPokemon />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {pokemonsData && pokemonsData.length > 0 ? (
            pokemonsData.map((pokemonData: PokemonAPIData) => (
              <PokemonCard key={pokemonData.name} url={pokemonData.url} />
            ))
          ) : singlePokemonData ? (
            <PokemonCard url="" pokemonDataProp={singlePokemonData} />
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
