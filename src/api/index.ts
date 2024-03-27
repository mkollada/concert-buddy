import { supabase } from '../utils/supabase';
import { Show } from '../types/types';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { showArrayFromSupabase, showFromSupabase, showToSupabaseShow } from '../utils';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer'

interface SessionData {
  session: Session | null;
}

// Adds a given row to a given table in supabase
export async function addSupabaseRow(row: object, tableName: string) {
  const { data, error } = await supabase.from(tableName).insert([row]);

  if (error) {
    console.error('Error adding row:', error.message);
    return;
  }

  console.log(`Row added successfully in ${tableName}.`);
  console.log(`Supabase returned: ${data}`);
}

export async function addSupabaseShow(show: Show) {

  const supabaseShow = showToSupabaseShow(show)
  
  await addSupabaseRow(supabaseShow, 'shows');

  console.log('Show added successfully.');
}

export async function getSupabaseShows(): Promise<Show[]> {
  const { data: shows, error } = await supabase
  .from('shows')
  .select('*')

  if(error) {
    console.log('Error getting shows from supabase', error)
    return []
  }

  if (!shows) {
    console.log('No shows found')
    return []
  }

  const showArray = showArrayFromSupabase(shows)

  return showArray
}

export async function getSupabaseShow(id: string): Promise<Show|null> {
  const { data: supabaseShow, error } = await supabase
  .from('shows')
  .select('*')
  .eq('id', id)

  if(error) {
    console.log('Error getting shows from supabase', error)
    return null
  }

  if (!supabaseShow) {
    console.log('No shows found')
    return null
  }

  const showObject = showFromSupabase(supabaseShow)

  return showObject
}

export function getSupabaseSession() {
  const [data, setData] = useState<SessionData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      
      const {data, error} = await supabase.auth.getSession();
      
      setData(data)
      setError(error)
    
    };

    fetchSession();
  }, []);

  return ({ 
    data, error 
  })
}

//TODO photos are all going to be public for now, that probably needs to change
export async function uploadSupabasePhotos(uris: string[]) {
  const supabasePhotoURLs = [];

  // Upload each photo to Supabase Storage
  for (const uri of uris) {
    if(!uri.startsWith('https://mbfhsthnuwvtoubyrclp.supabase.co')) {
      
      const fileExtension = uri.split('.').pop(); // Assuming photos have a fileName property
      const path = `${(await supabase.auth.getSession()).data.session?.user.id}/${new Date().getTime()}.${fileExtension}`; // Create a unique path for each photo
      
      const file = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { error, data } = await supabase.storage.from('show_photos').upload(path, decode(file),{
        contentType: 'image/jpeg'
      })

      if (error) {
        console.error('Error uploading image:', error);
      } else {
        const url = supabase.storage.from('show_photos').getPublicUrl(path);
        supabasePhotoURLs.push(url.data.publicUrl);
      }
    }
    
  }

  return supabasePhotoURLs
}

export async function updateSupabaseShow(show: Show) {
  console.log('updating show...')
  const supabaseShow = showToSupabaseShow(show)
  if(show.id) {
    const data = await updateSupabaseRow('shows', supabaseShow.id, supabaseShow)
    console.log('show updated!')
    return data
  } else {
    console.log('WARNING show does not have id when trying to update. This is unexpected behavior')
    return false
  }
  
}

export async function updateSupabaseRow(tableName: string, rowId: string, newData: object) {

  const { data, error } = await supabase
      .from(tableName)
      .update(newData)
      .match({ id: rowId });

  console.log(error)

  if (error) {
      console.error('Error updating row:', error);
      return null;
  }

  return data;
}

export async function updateSupabaseItem(tableName: string, rowId: string, columnName: string, value: string | number | string[]) {
  const { data, error } = await supabase
  .from(tableName)
  .update({ [columnName]: value })
  .match({ id: rowId }); // Assuming 'id' is the primary key column

  console.log(value)

  console.log('error:', error)
  console.log('data:', data)

  if (error) {
    console.error('Error updating data:', error);
    return null;
  } else {
    console.log('Supabase show updated')
  }

  return data;
}

export async function updateSupabaseShowItem(showId: string, columnName: string, value: string | number | string[]) {
  
  console.log('Updating supabase show')

  const data = await updateSupabaseItem('shows', showId, columnName, value)

  return data;
}

/**
 * Deletes a row from a given table in Supabase.
 * 
 * @param {string} tableName The name of the table.
 * @param {string} columnName The name of the column to match for deletion.
 * @param {any} value The value to match in the specified column.
 * @returns {Promise} A promise that resolves when the operation is complete.
 */
async function deleteSupabaseRow(tableName: string, columnName: string, value: string) {
  const { data, error } = await supabase
      .from(tableName)
      .delete()
      .match({ [columnName]: value });

  if (error) {
      console.error('Error deleting row:', error);
  }



  return {data, error}
}

export async function deleteSupabaseShow(showId: string) {
  const {data, error} = await deleteSupabaseRow('shows','id',showId)
  console.log(`deleted show: ${showId}`)
  return {data, error}
}
