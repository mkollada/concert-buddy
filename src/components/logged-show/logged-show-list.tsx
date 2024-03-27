import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Button, ScrollView, RefreshControl } from 'react-native';
import { Link } from 'expo-router';
import { getSupabaseShows } from '../../api';
import { Show } from '../../types/types';
import { LoggedShowBlock } from '../../components/logged-show/logged-show-block';

interface LoggedShowListProps {
    showReload: boolean;
    setShowReload: (value: boolean) => void;
}

export default function LoggedShowList({ showReload, setShowReload }: LoggedShowListProps) {
    const [shows, setShows] = useState<Show[]>([]);
    const [deleteShowId, setDeleteShowId] = useState('');
    const isInitialRender = useRef(true);

    useEffect(() => {
        const fetchShows = async () => {
            try {
                console.log('reloading shows...');
                const result = await getSupabaseShows();
                // Sort shows by date in ascending order
                const sortedShows = result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setShows(sortedShows);
            } catch (error) {
                console.error('Error fetching shows', error);
            } finally {
                // Ensures setShowReload is called regardless of the try/catch outcome
                setShowReload(false);
            }
        };

        if (showReload) {
            fetchShows();
        }
    }, [showReload]);

    const onRefresh = () => {
        setShowReload(true);
    };

    // To immediately delete deleted show from logged shows on page
    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false; // Toggle ref after first render
            return;
        }
        const updatedShows = shows.filter(show => show.id !== deleteShowId);
        setShows(updatedShows);
    }, [deleteShowId]);

    return (
        <View className='flex-1 p-5'>
            {shows.length === 0 ? (
                <View className='flex-1 justify-center items-center'>
                    <Text className='font-bold text-white'>Get started logging a show!</Text>
                    <Link href="/find-artist" asChild>
                        <Button title='Log a show'/>
                    </Link>
                </View>
            ) : (
                <ScrollView className='flex-1'
                    refreshControl={
                        <RefreshControl
                            refreshing={showReload}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View className='bg-transparent'>
                        {shows.map((show: Show) => (
                            <View className='flex-1 justify-center' key={`${show.id}-btn`}>
                                <LoggedShowBlock show={show} setDeleteShowId={setDeleteShowId}/>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            )}
        </View>
    );
}
