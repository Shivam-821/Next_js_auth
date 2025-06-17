export default function UserProfile({params}: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl">Profile</h1>
      <hr />
      <p className="text-4xl">
        User Profile: <span className="p-2 rounded ml-2 bg-green-400 text-black">{params.id}</span>
      </p>
    </div>
  );
}
