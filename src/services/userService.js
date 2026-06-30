import { supabase } from "../lib/supabaseClient";

export const userService={

async getAll(){

return await supabase
.from("users")
.select("*")
.order("full_name");

},

async getById(id){

return await supabase
.from("users")
.select("*")
.eq("id",id)
.single();

},

async update(id,data){

return await supabase
.from("users")
.update(data)
.eq("id",id)
.select();

},

async delete(id){

return await supabase
.from("users")
.delete()
.eq("id",id);

}

}