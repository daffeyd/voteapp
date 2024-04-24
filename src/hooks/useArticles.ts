import { supabase } from "@/lib/supabase";
import { useState } from "react";

export const useArticles = () => {
  const [articles, setArticles] = useState<any[]>([]);

  const getArticles = async () => {
    const { data, error } = await supabase.from("article").select("*");

    if (data) {
      setArticles(data);
    }
    if (error) {
      console.log(error);
      
    }

  };

  return {
    articles,
    getArticles,
  };
};
