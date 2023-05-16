import logo from './logo.svg';
import './App.css';
import {Routes, Route, useNavigate} from "react-router-dom"
import {Register} from "./component/RegisterUser"
import {Login} from "./component/LoginUser"
import {Timeline} from './component/Timeline'
import { PostDetail } from './component/PostDetail';
import {EditCaption} from './component/EditCaption'
import {CreatePost} from './component/CreatePost'
import { UserProfile } from './component/UserProfile';
import { EditUserProfile } from './component/EditUserProfile';
import { EditUsername } from './component/EditUsername';
import { EditProfilePicture } from './component/EditProfilePicture';
import { CheckEmail } from './component/CheckEmail';
import { ResetPassword } from './component/ResetPassword';
import Error from './component/Error';
import ResendEmail from './component/ResendEmail';
import { EmailVerification } from './component/EmailVerification';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Timeline />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/edit-post/:id" element={<EditCaption />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/edit-profile" element={<EditUserProfile />} />
        <Route path="/change-username" element={<EditUsername />} />
        <Route path="/change-profile-pic" element={<EditProfilePicture />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/error" element={<Error />} />
        <Route path="/verification" element={<ResendEmail />} />
        <Route path="/auth/:token" element={<EmailVerification />} />
      </Routes>
    </div>
  );
}

export default App;
