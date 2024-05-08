import supabase, {supabaseUrl} from "./supabase";

export async function getCabins() {
  const {data, error} = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("Cabins Could not be loaded!");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = await supabase.from("cabins");

  // 1.A. Create Cabin
  if (!id) {
    query = query.insert([{...newCabin, image: imagePath}]);
  }
  // 1.B. Edit Cabin
  if (id) {
    query = query.update({
      ...newCabin,
      image: imagePath
    }).eq('id', id);
  }
  const {data, error} = await query.select().single();

  if (error) {
    throw new Error("Cabin Could not be created!");
  }

  // 2. upload image
  const {error: storageError} = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the Cabin if image was not uploaded
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image was not uploaded and the Cabin was not created!"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const {data, error} = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Cabin Could not be deleted!");
  }
  return data;
}
