import ProjectsProvider from '@/providers/project/list/provider';
import { ProjectQuery } from '@/convex/query.config'
import React from 'react'
import ProjectsList from '@/components/project/ProjectsList';

async function SessionPage() {

    const { projects, profile } = await ProjectQuery();

    if (!profile) {
        return (
            <div className='container mx-auto py-8'>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold text-foreground mb-4'>
                        Authentication Required
                    </h1>
                    <p className='text-muted-foreground'>Please sign in to view your projects</p>
                </div>
            </div>
        )
    }

    return (
        <ProjectsProvider initialProjects={projects}>
            <div className='container mx-auto py-12 px-4 md:px-32'>
                <ProjectsList />
            </div>
        </ProjectsProvider>
    )
}

export default SessionPage