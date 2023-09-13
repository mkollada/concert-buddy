import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import React, { useEffect, useState } from 'react';
import Account from '../../components/Account';
import { supabase } from '../../utils/supabase';
import { Session } from '@supabase/supabase-js';

interface SessionData {
  session: Session | null;
}

export default function ProfileScreen() {
  
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

  if (error) {
    return <Text>Error loading session</Text>;
  }

  if (!data) {
    return <Text>Loading...</Text>;
  }
  
  return (
    <View style={styles.container}>
      <Account session={data.session} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
