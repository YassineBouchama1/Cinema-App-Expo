import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { replaceIp } from '@/hooks/helpers';
import { AirbnbRating } from 'react-native-ratings';

const MoviesDetails = () => {
  const { movie } = useLocalSearchParams();
  const movieObject = movie ? JSON.parse(decodeURIComponent(movie as string)) : null;

  const [comments, setComments] = useState('');
  const [commentList, setCommentList] = useState([
    'Great movie!',
    'Amazing plot and cinematography.',
    'The acting was top notch.',
  ]);

  const addComment = () => {
    if (comments.trim()) {
      setCommentList((prev) => [...prev, comments.trim()]);
      setComments('');
    }
  };

  if (!movieObject) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: replaceIp(movieObject.posterImage, '192.168.8.254') }} style={styles.posterImage} />
      
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movieObject.title}</Text>
        <Text style={styles.description}>{movieObject.description}</Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.releaseDate}>Release Date: {new Date(movieObject.releaseDate).toLocaleDateString()}</Text>
          <Text style={styles.genre}>Genres: {movieObject.genre.join(', ')}</Text>
          <Text style={styles.duration}>Duration: {movieObject.duration} minutes</Text>
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Rating:</Text>
          <AirbnbRating
            count={5}
            defaultRating={movieObject.rating || 0}
            size={30}
            showRating={false}
            isDisabled
            starContainerStyle={styles.starContainer}
          />
        </View>

        <TouchableOpacity style={styles.favoriteButton}>
          <Text style={styles.favoriteText}>Add to Favorites</Text>
        </TouchableOpacity>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.watchButton}>
            <Text style={styles.buttonText}>Watch Movie</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reserveButton}>
            <Text style={styles.buttonText}>Reserve Seat</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.commentsSection}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            placeholderTextColor="#bbb"
            value={comments}
            onChangeText={setComments}
            onSubmitEditing={addComment}
          />
          <TouchableOpacity onPress={addComment} style={styles.addCommentButton}>
            <Text style={styles.addCommentText}>Post Comment</Text>
          </TouchableOpacity>

          <View style={styles.commentList}>
            {commentList.map((comment, index) => (
              <Text key={index} style={styles.commentText}>{comment}</Text>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  posterImage: {
    width: '100%',
    height: 400,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  detailsContainer: {
    padding: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 15,
  },
  infoContainer: {
    marginBottom: 15,
  },
  releaseDate: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 5,
  },
  genre: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 5,
  },
  duration: {
    fontSize: 16,
    color: '#aaa',
  },
  ratingContainer: {
    marginTop: 15,
    marginBottom: 15,
  },
  ratingLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1c40f', // Gold color for the label
  },
  starContainer: {
    marginVertical: 10,
  },
  favoriteButton: {
    backgroundColor: '#e50914',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  favoriteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  watchButton: {
    backgroundColor: '#1abc9c',
    borderRadius: 5,
    paddingVertical: 12,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  reserveButton: {
    backgroundColor: '#e67e22',
    borderRadius: 5,
    paddingVertical: 12,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentsSection: {
    marginTop: 20,
  },
  commentInput: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  addCommentButton: {
    backgroundColor: '#f1c40f',
    borderRadius: 5,
    paddingVertical: 8,
    alignItems: 'center',
  },
  addCommentText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentList: {
    marginTop: 15,
  },
  commentText: {
    color: '#bbb',
    fontSize: 16,
    marginBottom: 8,
  },
});

export default MoviesDetails;
