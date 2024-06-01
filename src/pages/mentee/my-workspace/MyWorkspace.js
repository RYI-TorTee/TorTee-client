import React, { useState } from 'react';
import NavMentee from '../../../components/Nav-mentee/NavMentee';
import Footer from '../../../components/footer/Footer';
import './MyWorkSpace.scss';

export default function MyWorkspace() {
    const [activeContent, setActiveContent] = useState('assignment');

    const renderBanner = () => {
        switch (activeContent) {
            case 'assignment':
                return <h2>Projects/ Tasks</h2>;
            case 'submission':
                return <h2>My Submissions</h2>;
            case 'mentors':
                return <h2>Mentors List</h2>;
            default:
                return <h2>Projects/Tasks</h2>;
        }
    };

    const renderWorkspaceContent = () => {
        switch (activeContent) {
            case 'assignment':
                return <div>Assignment Content</div>;
            case 'submission':
                return <div>Submission Content</div>;
            case 'mentors':
                return <div>Mentors List Content</div>;
            default:
                return <div>Default Content</div>;
        }
    };

    return (
        <div>
            <NavMentee activePage="workspace" />
            <div className='workspace-container'>
                <div className='navbar-workspace'>
                    <button
                        className={`btn-workspace btn-assignment ${activeContent === 'assignment' ? 'active' : ''}`}
                        onClick={() => setActiveContent('assignment')}
                    >
                        Assignment
                    </button>
                    <button
                        className={`btn-workspace btn-submission ${activeContent === 'submission' ? 'active' : ''}`}
                        onClick={() => setActiveContent('submission')}
                    >
                        Submission
                    </button>
                    <button
                        className={`btn-workspace mentors ${activeContent === 'mentors' ? 'active' : ''}`}
                        onClick={() => setActiveContent('mentors')}
                    >
                        Mentors-List
                    </button>
                </div>
                <div className='content-workspace'>
                    <div className='banner-project'>
                        {renderBanner()}
                    </div>
                    <div className='my-workspace'>
                        {renderWorkspaceContent()}
                    </div>
                </div>
            </div>
            <Footer backgroundColor={'#6ADBD7'} color={'#274a79'} />
        </div>
    );
}
