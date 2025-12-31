import { useState } from "react";
import { useUser } from "../context/UserContext";

export default function Settings() {
  const { profile, updateUsername } = useUser();
  const [username, setUsername] = useState(profile?.username || "");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    await updateUsername(username);

    setSaving(false);
    setSuccess(true);
  };

  return (

 <></>
  );
}
