import supabase from '../utils/supabase';
import { Show } from '../types/types';

// Adds a given row to a given table in supabase
export async function addSupabaseRow(row: object, tableName: string) {
  const { data, error } = await supabase.from(tableName).insert([row]);

  if (error) {
    console.error('Error adding row:', error.message);
    return;
  }

  console.log('Row added successfully in ${tableName}.');
  console.log('Supabase returned: ' + data);
}

export async function addSupabaseShow(show: Show) {
  await addSupabaseRow(show, 'Shows');

  console.log('Show added successfully.');
}
