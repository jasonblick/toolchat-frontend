// Home.jsx

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useAuth } from './context/AuthContext';
import tool from './assets/tool.svg';
import "./index.css";

export default function Home() {
  const { supabase, session } = useAuth();
  console.log(session)

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
        <img src={tool} alt="Logo" width="150px" height="150px" style={{ marginBottom: "70px" }} />
        <div style={{
            backgroundColor: "#252525",
            padding: "2rem",
            borderRadius: "0.5rem",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <Auth
                supabaseClient={supabase}
                appearance={{ 
                    style: {
                        button: { background: '#454545', color: 'white', borderColor: '#4d4d4d' },
                        input: { background: '#4d4d4d', color: 'white' },
                    },
                    theme: ThemeSupa,
                }}
                localization={{
                  variables: {
                    sign_in: {
                      email_label: '',
                      password_label: '',
                      email_input_placeholder: "Email Address",
                      password_input_placeholder: "Password",
                    },
                    sign_up: {
                      email_label: '',
                      password_label: '',
                      email_input_placeholder: "Email Address",
                      password_input_placeholder: "Password",
                    },
                  },
                }}
                theme="default"
                providers={["google", "github"]}
            />
        </div>
    </div>
  );
}
