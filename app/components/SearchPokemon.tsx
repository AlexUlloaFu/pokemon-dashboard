"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  searchArg: z.string(),
});

function SearchPokemon() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSearchSubmit = (data: z.infer<typeof FormSchema>) => {
    const { searchArg } = data;
    const currentParams = new URLSearchParams(searchParams.toString()); // Get current search params
    currentParams.set("search", searchArg.toLowerCase());
    router.push(`/?${currentParams.toString()}`);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      searchArg: "",
    },
  });

  return (
    <div className="flex space-x-2 justify-center items-center text-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSearchSubmit)} className=" space-x-2 flex">
          <FormField
            control={form.control}
            name="searchArg"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Find that pokemon..." {...field} />
                </FormControl>
                <FormDescription>Search the pokemon you wish to see</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            <FaSearch size={20} />
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SearchPokemon;
