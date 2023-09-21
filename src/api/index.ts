import { supabase } from '../utils/supabase';
import { Show } from '../types/types';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { showArrayFromSupabase, showFromSupabase } from '../utils';

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
  await addSupabaseRow(show, 'shows');

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