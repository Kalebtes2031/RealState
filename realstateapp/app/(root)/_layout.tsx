import { useGlobalContext } from "@/contexts/GlobalProvider";
import { Redirect, Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout(){
    const { loading, isLogged} = useGlobalContext();

    if(!isLogged){
        return <Redirect href='/signin' />
    }
    return <Slot />;
}