import { supabase } from '../utils/supabase';
import { Show } from '../types/types';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { showArrayFromSupabase, showFromSupabase, showToSupabaseShow } from '../utils';
import * as ImagePicker from 'expo-image-picker';


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
  const { data: show, error } = await supabase
  .from('shows')
  .select('*')
  .eq('id', id)

  if(error) {
    console.log('Error getting shows from supabase', error)
    return null
  }

  if (!show) {
    console.log('No shows found')
    return null
  }

  const showObject = showFromSupabase(show)

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
export async function uploadSupabasePhotos(photos: ImagePicker.ImagePickerAsset[]) {
  const photoURLs = [];

  // Upload each photo to Supabase Storage
  for (const photo of photos) {
    const fileExtension = photo.uri.split('.').pop(); // Assuming photos have a fileName property
    const path = `shows/${new Date().getTime()}.${fileExtension}`; // Create a unique path for each photo

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { error, data } = await supabase.storage.from('show_photos').upload(path, photo.uri);

    if (error) {
      console.error('Error uploading image:', error);
    } else {
      const url = supabase.storage.from('show_photos').getPublicUrl(path);
      photoURLs.push(url.data.publicUrl);
    }
  }

  return photoURLs
}