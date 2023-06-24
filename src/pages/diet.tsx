import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import React from "react";

export default function DietPage() {
  const { data, error, isLoading } = api.example.getUsersDiet.useQuery();
  const router = useRouter();

  const [loading, setLoading] = React.useState<boolean>(true);

  const { data: sessionData } = useSession();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {loading && (
        <div className="animate-pulse rounded-xl bg-gray-100 p-[50px] shadow-2xl">
          <p className="mb-5 text-2xl font-bold">
            Creating personalized diet ...
          </p>
        </div>
      )}
      {data && !loading && (
        <div className=" rounded-xl bg-gray-100 p-[50px] shadow-2xl">
          <p className="mb-5 text-2xl font-bold">
            Calories per day: {data.calories}
          </p>

          {data.meals.map((meal) => (
            <div key={meal.id} className="mt-4 space-y-3">
              <p className="text-2xl font-bold">Meal: {meal.name}</p>
              <p>Calories: {meal.calories}</p>
              <p>Ingredients:</p>
              <ul className="ml-10 list-disc">
                {meal.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
