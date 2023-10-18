import { useEffect, useState } from 'react';
import PageMenu from '../../components/pageMenu/PageMenu';
import '../../styles/Profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/card/Card';
import { getUser, updatePhoto, updateUser } from '../../redux/features/auth/authSlice';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { shortenText } from '../../utils';
import Loader from '../../components/loader/Loader';

const Profile = () => {
  const { isLoading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch() 

  const initialState = {
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    photo: user?.photo ?? '',  // Make sure to provide a default value
    role: user?.role ?? '',
    address: {
      address: user?.address?.address ?? "",
      state: user?.address?.state ?? "",
      country: user?.address?.country ?? "",
    },
  };
  
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  
  useEffect(() => {
    if(user == null) {
        dispatch(getUser())
    }
}, [dispatch, user])

//set the data received from the backend to the form
useEffect(() => {
    if (user) {
      setProfile({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        photo: user?.photo || '',
        role: user?.role || '',
        address: {
          address: user?.address?.address || "",
          state: user?.address?.state || "",
          country: user?.address?.country || "",
        },
      });
    }
  }, [user]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (['address', 'state', 'country'].includes(name)) {
      setProfile(prevProfile => ({
        ...prevProfile,
        address: {
          ...prevProfile.address,
          [name]: value
        }
      }));
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };
  

  const saveProfile = async (e) => {
    e.preventDefault();
  
    const userData = {
      name: profile.name,
      phone: profile.phone,
      address: {
        address: profile.address.address,
        state: profile.address.state,
        country: profile.address.country,
      },
    };
    const userId = user._id;
    await dispatch(updateUser({userData, userId}));
    await dispatch(getUser());  
  };
  

  const handleImageChange = (e) => {
      setProfileImage(e.target.files[0])
      setImagePreview(URL.createObjectURL(e.target.files[0]))
  };
//save cloudinally
const cloud_name =  import.meta.env.VITE_APP_CLOUD_NAME;
const upload_preset =  import.meta.env.VITE_APP_UPLOAD_PRESET

  const savePhoto = async (e) => {
    e.preventDefault()

    let imageUrl;
//check if image is valid type
    try {
        if(profileImage !== null && (
            profileImage.type === "image/jpeg" || profileImage.type === "image/jpg" || profileImage.type === "image/png"
        ) ) {
            const image = new FormData()
            image.append("file", profileImage)
            image.append("cloud_name", cloud_name)
            image.append("upload_preset", upload_preset)
            const url = "https://api.cloudinary.com/v1_1/dlionndxl/image/upload"
            //save to cloudinally
            //lets use fetch, axios block some req
            const response = await fetch(url, {
                method: "post", body: image
            })
            const imgData = await response.json()
            // console.log(imgData)
            imageUrl = imgData.url.toString()

            //save image to db
            const userData = {
                photo: profileImage? imageUrl : profile.photo
            }
            await dispatch(updatePhoto(userData))
            setImagePreview(null)
        }
    } catch (error) {
        toast.error(error.message)
    }

  }
  return (
    <>
      <section>
        {isLoading && <Loader />}
        <div className="container">
          <PageMenu />
          <h2>Profile</h2>
          <div className="--flex-start profile">
            <Card cardClass={'card'}>
              {!isLoading && user &&(
                <>
                    <div className="profile-photo">
                        <div>
                        <img src={imagePreview || user?.photo || 'defaultImageURL'} alt='profile'/>
                            <h3>Role: {profile.role}</h3>
                            {imagePreview !== null && (
                               <div className='--center-all'>
                                 <button className='--btn --btn-secondary' onClick={savePhoto}>
                                    <AiOutlineCloudUpload size={18}/>
                                    Upload Photo
                                </button>
                               </div>
                            )}
                        </div>
                    </div>
                    <form onSubmit={saveProfile}>
                      <p>
                        <label>Change Photo: </label>
                        <input
                          type="file"
                          accept="image/*"
                          name="image"
                          onChange={handleImageChange}
                        />
                      </p>
                      <p>
                        <label>Name: </label>
                        <input
                          type="text"
                          name="name"
                          value={profile?.name}
                          onChange={handleInputChange}
                          required
                        />
                      </p>
                      <p>
                        <label>Email: </label>
                        <input
                          type="email"
                          name="email"
                          value={profile?.email}
                          onChange={handleInputChange}
                          disabled
                        />
                      </p>

                      <p>
                        <label>Phone: </label>
                        <input
                          type="text"
                          name="phone"
                          value={profile?.phone}
                          onChange={handleInputChange}
                        />
                      </p>
                      <p>
                        <label>Address: </label>
                        <input
                          type="text"
                          name="address"
                          value={profile?.address?.address}
                          onChange={handleInputChange}
                          required
                        />
                      </p>
                      <p>
                        <label>State: </label>
                        <input
                          type="text"
                          name="state"
                          value={profile?.address?.state}
                          onChange={handleInputChange}
                          required
                        />
                      </p>

                      <p>
                        <label>country: </label>
                        <input
                          type="text"
                          name="country"
                          value={profile?.address?.country}
                          onChange={handleInputChange}
                          required
                        />
                      </p>
                      <button className="--btn --btn-primary --btn-block">Update Profile</button>
                    </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export const Username = () => {
    const { user} = useSelector((state) => state.auth)

    const username = user?.name || "..."

    return(
        <span style={{color: "#ff7722"}}>Hi, {shortenText(username, 9)} | </span>
    )
}
export default Profile;
