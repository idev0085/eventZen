import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesome5 as Icon } from '@react-native-vector-icons/fontawesome5';
import { AudioProject } from '../types';
import { FileService } from '../services/FileService';

const mockProjects: AudioProject[] = [
  {
    id: '1',
    name: 'Morning Alarm',
    sourceFile: {
      id: '1',
      name: 'morning_song.mp3',
      uri: '/path/to/file',
      duration: 45,
      size: 2048000,
      format: 'mp3',
      createdAt: '2025-01-01T10:00:00Z',
      favorite: true,
    },
    effects: [],
    startTime: 10,
    endTime: 35,
    outputFormat: 'mp3',
    createdAt: '2025-01-01T10:00:00Z',
    modifiedAt: '2025-01-01T10:30:00Z',
  },
  {
    id: '2',
    name: 'Notification Tone',
    sourceFile: {
      id: '2',
      name: 'notification.wav',
      uri: '/path/to/file2',
      duration: 15,
      size: 1024000,
      format: 'wav',
      createdAt: '2025-01-01T11:00:00Z',
      favorite: false,
    },
    effects: [],
    startTime: 0,
    endTime: 15,
    outputFormat: 'mp3',
    createdAt: '2025-01-01T11:00:00Z',
    modifiedAt: '2025-01-01T11:15:00Z',
  },
];

export default function ProjectsScreen() {
  const [projects, setProjects] = useState<AudioProject[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      // In a real app, this would load from storage
      console.log('Loading projects...');
    } catch (error) {
      Alert.alert('Error', 'Failed to load projects');
    }
  };

  const handleDeleteProject = (projectId: string) => {
    Alert.alert(
      'Delete Project',
      'Are you sure you want to delete this project?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setProjects(prev => prev.filter(p => p.id !== projectId));
          },
        },
      ]
    );
  };

  const handleDuplicateProject = (project: AudioProject) => {
    const duplicatedProject: AudioProject = {
      ...project,
      id: Date.now().toString(),
      name: `${project.name} (Copy)`,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    };
    setProjects(prev => [duplicatedProject, ...prev]);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#111827', '#1F2937']} style={styles.header}>
        <Text style={styles.headerTitle}>My Projects</Text>
        <Text style={styles.headerSubtitle}>Manage your ringtone projects</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{projects.length} Projects</Text>
            <TouchableOpacity style={styles.sortButton}>
              <Icon name="sort" size={20} color="#8B5CF6" />
              <Text style={styles.sortText}>Sort</Text>
            </TouchableOpacity>
          </View>

          {projects.map((project) => (
            <TouchableOpacity
              key={project.id}
              style={[
                styles.projectCard,
                selectedProject === project.id && styles.projectCardSelected,
              ]}
              onPress={() => setSelectedProject(
                selectedProject === project.id ? null : project.id
              )}
            >
              <View style={styles.projectHeader}>
                <View style={styles.projectInfo}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  <Text style={styles.projectSource}>{project.sourceFile.name}</Text>
                </View>
                <View style={styles.projectMeta}>
                  <Text style={styles.projectDuration}>
                    {formatDuration(project.endTime - project.startTime)}
                  </Text>
                  <Text style={styles.projectFormat}>{project.outputFormat.toUpperCase()}</Text>
                </View>
              </View>

              <View style={styles.projectDetails}>
                <View style={styles.projectStat}>
                  <Icon name="schedule" size={16} color="#9CA3AF" />
                  <Text style={styles.projectStatText}>
                    Modified {formatDate(project.modifiedAt)}
                  </Text>
                </View>
                <View style={styles.projectStat}>
                  <Icon name="tune" size={16} color="#9CA3AF" />
                  <Text style={styles.projectStatText}>
                    {project.effects.length} effects applied
                  </Text>
                </View>
              </View>

              {selectedProject === project.id && (
                <View style={styles.projectActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Icon name="edit" size={20} color="#8B5CF6" />
                    <Text style={styles.actionText}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDuplicateProject(project)}
                  >
                    <Icon name="content-copy" size={20} color="#10B981" />
                    <Text style={styles.actionText}>Duplicate</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionButton}>
                    <Icon name="share" size={20} color="#F59E0B" />
                    <Text style={styles.actionText}>Share</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDeleteProject(project.id)}
                  >
                    <Icon name="delete" size={20} color="#EF4444" />
                    <Text style={styles.actionText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))}

          {projects.length === 0 && (
            <View style={styles.emptyState}>
              <Icon name="folder-open" size={64} color="#E5E7EB" />
              <Text style={styles.emptyTitle}>No Projects Yet</Text>
              <Text style={styles.emptySubtitle}>
                Create your first ringtone project to get started
              </Text>
              <TouchableOpacity style={styles.createButton}>
                <LinearGradient colors={['#8B5CF6', '#A855F7']} style={styles.createGradient}>
                  <Icon name="add" size={24} color="#FFFFFF" />
                  <Text style={styles.createText}>Create Project</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#E5E7EB',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  sortText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8B5CF6',
  },
  projectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  projectCardSelected: {
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  projectSource: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9CA3AF',
  },
  projectMeta: {
    alignItems: 'flex-end',
  },
  projectDuration: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  projectFormat: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  projectDetails: {
    gap: 8,
  },
  projectStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  projectStatText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA3AF',
  },
  projectActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 24,
  },
  createButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  createGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 8,
  },
  createText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});