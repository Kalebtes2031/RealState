import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Signin = () => {
  const { login } = useGlobalContext();
  const router = useRouter();

  const handleSignin = () => {
    login({
      $id: "1",
      name: "Abeni Ayele",
      email: "abeni@example.com",
      avatar:
        "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
    });

    router.push("/"); // Redirect to home
  };
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <Image
          source={require("../assets/images/signin.png")}
          className="w-full h-4/6 mt-5"
          resizeMode="contain"
        />
        <View className="px-10 items-center flex flex-col ">
          <Text className="text-[18px] text-center uppercase font-rubik text-black-200">
            Welcome To Real Scout
          </Text>

          <Text className="text-[20px] font-rubik-bold text-black-300 text-center mt-2">
            Let&apos;s Get You Closer To {"\n"}
            <Text className="text-secondary">Your Ideal Home</Text>
          </Text>

          <Text className="text-lg font-rubik text-black-200 text-center mt-12">
            Login to Real Scout with Google
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleSignin}
          className="bg-white  shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
        >
          <View className="flex flex-row items-center justify-center gap-x-2">
            <Image
              source={{
                uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAABUFBMVEX////u7u7nPC4uo0s8f/P5tgTt7e07fvMuokrs7OznOy7v7+/z8/P5+fn8/Pz29va+z/HI2Pr18+1QifNBgvObte/6+PQAnDTmMSHH1PA0e/Oq07LlAADnNij5rwDS3/unwPkldfMhoELJ3M3mIQnmKhnu+PnrXyft8vkbcfMAmCc8fPnY6tzqop/87Ovtvbn2z8zoVUnqjonpa2LqVSrveSH6vQDmMDAAafP5x1R2ovP4uiqJxJXd4+9WsGr99ftvuX/t3Nv33NP0trHtgXnqYlfoSjzocmzvnJbyjiz63LX4vUzpSSz3wV30nBTx3MH1ynvy6dr01aH1w2vynk22zPmLrfFgkvP1zZLFvGHksxiBqDPKsSNwpz+trjJLpUaerTjHsTmqz72AsNgAlVVGkcg0lKAymIk5hdsxnW42kLE4iM8ym3qwzNyQxaa/38ZbJLgcAAAZLklEQVR4nNVd+X/bNpYnLZs2BR6pkkiKbDkxbalyIsuSPT02USTLVzzpkaYzcTq9t9tOO53d6P//bXEDBEERpCm38z6d4YtMivgKwHsPD18Alg3FCS0oHtdCB2peADXfhR8CpAVIc7EGkObjRxz5EdtDmg814GANOO5sdnp4eHZ2AOXs7PBwOHBcx/PwjSF6NcAaYG/xkWb77C02/m6kOR4vIn8LKSIuGMDFscoHAyAGdzA7vDq/uOxsIdmjgv/RWbk4vjo8HQyAC6AsBAOKgxElc/kzSEuAcWQwroQf/RXCODu/gAXf6zTb1eoKlir+j6jtZgfBGp0fHM5mrqgjk5pxFoNBvw4IAyge0jw/poX4z0jzbajYWPPYI0TziAYbTzgYDg/OLzsQBit6qlTb8LaVF1fD00HQ9dhbQl4cXxQMsLeoBcOadKPlI6E3MQ3ENfoG/iHWAH+EvWswPDsawRK2RS1k4FlpN/c6qIYGsEyhg34t9N0h+t0c5X2iiCH5WVnBHKx5rMnKLczjbV/0T583adzCcCuwAL8RPgK6A1glIwikWjUDwvGswBq6hHgC3Jps/Babt2iPt+gw1sJsG2v4RosXTICxjcDw9olfTcB0u7ODF6M2qpJi0u40Yf3Mul3gqGBsGYy9AIxdDhgwPB+tNGmdVKuaa1Vc025od6qj80O7e3MwgedCIWCQRsAgjYCxoUYbANQcAobeGBweX7bb+rJW068aUO3myvEhLo6DvjvgxVEK5iONODJ8IwGDNWKaA98PuOYTC4hNA/4VuIY7G/49sBZ07bNRs902qBGzGmp3Ls9gY0M9nvQCL6CaQzSbaaTd4BtxEXG59U4z5mfSnWZ41t6ilYK7Pev96nVFXPU3iBvbW1tnnmg4txYBDA5HW4X7fIqgutu6GPplgnGzwEDjf3qx1aStJqc9zgLU6Zyf+lZxMNjRkgaJHK3DNGxDSASAwfjkRg8Mr6D/LhMCBUJk7/Jg4AHcFYLAkgpmywVzSMFwEUkEECLxsCzWPKH5s4PR3kqs/5YKBnadveNDz19QHKDRPOpnXMehbQ1pxDRDxaGmGWnYVAKkecNzaEaXIrzZVjsrR6fI7TkO9TO8YD7SiJ9BRWQRAJT8TrM7u7rsLAdKDFZ77+IQm6IlRgDdw4t22TZMgiBL8/Jo0C0ARhcBOLEIgISkXvdqiVBUaTePh10GxiQCIAE86kRC8+Ka+HPXOy8eTppIVZHm5RkbY2iKiFWpiMQ0+zo/Y6l+BnSHab2lfCNNpb13VRfepbwIAICzZRkxLmrNQNl6MfNKBwPcqw6PjtV4saya0YBZ2RsNPUMw2FSHzIfQ7AS05C4Fw13M7Ki5/K4vAk8RgUKXMwRsUJssWIDdDgFD/Cf+/5CJJz5kmj970Vlax4ih0Qg0A55apmQRQ1wRaHC2OAJwu8PjvdvAogezsndBW4vFKoWa5iIRQHd4cQtOP1U6o9PyIoDucHRLWLQV07kc5A1nXA0Y0sys4aiJLVZVpCaZSq/LbIKdlUHS9+lTTfEYP8SZSRDTAojF7DdF4HRXYctTbuBXLZaZMgRABbMVjQwBbJsnjl1tBNA9vVi2q1wkndFAigAcuXqEn2GmOcNpOt7s2KS/KE60YHYm+b1N2PdLS2iA2Qsjm1wSGDWd07wY5skBOHws5ykRAO5Y7lHHqHdrzVBuUcFgLDg0cXgEIA03PR4BUDB0VI9Sf6SLxTT/wNDvlwRmJQamORpavDhpRQxFYUUEgKuCxAKA/gpu9xAOX8pAYwg2/pUQS5e1FlFEkg2QIgDSHTIjgO7pSruQB5Eeoj846y85vqS5MrTKmwUADnSWpgWgN1blaxXPj+G5zD0ytYlnBs2sWbNzWuaURvfFjYKYanNvq3P54ujgbDgczqAcnl0dHV82t/ZM+mGzfZp/SiPA04I4W4BzhngiA2td2Pk1LTmt6PEfGALZOj4bDvwAVjAgxsaG4w7H82Zn57CW0mqIYWkOrWTBhObitCbWyIwrTmi4LjfNUGWmGWr+7DLHYCxWpnZza3Qws9B8Kps0Em+xQbfbPT24QHOGCTDcv6ycouwQcXuA933Pcfk4wKXDtADByIgAgHvR1BuZdDAESXtldDXDL8TTBcrcJG/Hg6tRlc1SSUaPYLkcWjfkAchggHeVy5Cx4jTbly8OQRdkg7G6YHh82W5qwCD/UiapwRuO8lQMlXbz4mjodQHplalgWMm63eHRKJlZQFhi8zOOJtBcQGpQyQDeLK8lQw1sb3R0auGcnZimByGfphdEAzyT5+Gs4vDossN9Kv6i5uWhJVMAGKmBPkLJACTzF2cpJEgNiDEAgvAM/mD5aqbaWTkfwgbmxXEEDn+XzVgLMkOh6xy+QJXD3wT7Szc/qQEsIDXMRtmEkTgUNKNiwwbm0ACV1z0eF/q8RSsEIt8F3dmBlChFfl/XPIuTGupXHck+mYBpNq8G+MspGGcxGFuAQXOKsxdb1FE1O8OSSQ3hLG+OrDM6DGjaID8YWMbBAZm2Rr6yXFKDA1504uY/S/aOZ8QK4vDBotMOJBPqch4EnoBg/lmmTiBtiNC094bWTUgNJD2LggObafCL87F59q7o3ByJMXBcjidRmeZjJ06IYEgDXLPJhDAcaA2bzXZniFSbzBeT4RfVaCTjMA19t4snaPHgjEwxa53mZTtHxcCf8yzRChb7Gc6GkmmN4WDUJn2/FCYg04ZbeaoFmZ8ywABrMFwCR/Ovf/nIuJlVsbsuBUxphFOJ1GC9XNt+v/qRoWmGWHzGg7AB50HQnmJTHoSPI5KQ3+gpj9g2o04QMFzzFLYF1wxJDeCTtbXtD1YkNAvqpXMx9OWHmSapQKNpH+G5VEkzJTWEMqnB4VMavS/XkPz1048MGhmsl0DK/4Rck/I/2NiwwVkiq6WkjAgTkOcpgpuRGkLwGQaz9jnsOFlV0748jDXkwk6Tt/0ER/NGEUDv1TMCBja1LDPQrh5Yf0Yw3NF2v1jj8sFHiyumeZ7mzslYNiMCoGDw0J49QptZPALIR2qwccfCwf/rzwSYDz9fWDfNUVdhP5DZBcJKTjIiZDYCvxEon+keEUXMR2qg3Z+h+XAlHU67WVPo8yX4mYD7mRuQ5+idoPa3tbh8kNrM9g7TV2n8sU6T3im6P5c0G713bi0fTN7YLEZqsL9UsSAbraubNpo0VbPZgGsEjM39BYmaLZaZJyUTj9g45GaPUDDc92G2hUJqwLMuGEKS1EDd62u1lWEz8D7zOCIrUN07C2MeOYx9T2yW1Eu7URc06LTUG9W/YkCc1JBsZcTjcOfJsZy7QJ4BcqUIQMwAEdPMIwBlXks3aaREAMoEmBQBZJMagi+3dWDWtpGNlkc47ZWhZ/O2/2dzmgRM7Qs9mLUPt/8ih9FwaFkHf2owsDZff6LHsqYEN22UChY5EAGGp4MCvrxLD8aVwTipYCwp1WRCavCEhK9SsayJ4AZK56hG4nmA6EQ4YAehp5fQRn+Oa3oB/M8g+0ZbaOLNsFdyD5DaykhT+/xTWjnt0bAreBCsf0IN0B/OYX7G0fsZl/sZaprRxA1gvzAx0qjquWnmfia+sm8RqcFNb2UEzfu0YqApW7xO849ymhKY1wux4I7zKTJll2dd+88JRjL+rxa1MiIouGkeDwCfbEtxA6yZJUeMYlyqRABshR5z51jjEUAeUgOOr7/KBoPCgfZVN80F6wbmi8fyqWsojB+RVAyIUhk0sUwSzfb7l0P2EzpqwKTwQXnoRJqiCAM9Nx5j8Uew5Q54a1FiuhykBtsAC5Ttv09ZQ87pNGtI6kirazTyZ0XT3Vjnf8aa1mkCN7uVYfmiVwBM78F7791B8h4SoWk/zHWjrQXz0gzMs1dBATAP367eEyLrC2V14T+R7DyUwHBSQ+8rs4p55oWcRUCT9Ch54XNGhM/oBjib7xPiwcO7rfWlyP6dukxqYPmPz7KB4FZG1psqWRZpiarLUyY2y7IEtQcYzOrqKi5B6hWr+F/sup5x3blf05EatGOZhGy/tLJ3akg4zfoDo5opAuZpTRcBmFXMdu12wSwGBZW7OjCBWf/fztipgUToaqCJwKwuRdZbEhg+YV8zA/NJoG6FoGihjtSAwRjUTAHZF1wBRGogxTOIzJB80QN4WbegTZCEo0SgCHyySQW5EW/AUH9oZgAKyMfwLYFCauiljP/VVvayJyUcVT8TG2nKfiZ4uKxmtvrx86TT7GlSZjowr0BipwYDp7nEmtl/TwPmi2wkCMzrpYLJa83gdf9NHAxy3aZgXEfaqUG7uYOO1BCYRQAF/Mz6DgEjIgAYd1j/ZQRmzQrIrIgfJ06GpMycOEkmUZnm15bkZxCY6xriP8ZJDaZgTPZq0jnNQh3CQFooBFCdphmYZ4XBGNVMWWDMQrMbgCm7SlLBwPZmCobQDQRDwVEZCpzUEApSQw1HAOjdi61ZETBva44t7dWEcgI9QzA9T14wodOUpRM4PYlM87LA3LXY+5ifcYzBSJkgNf+TTmoImJ9ZzwCTas3YNRE1QzCJKY2eoQHoJfdqMneaBUxzpp+hYOIRgKFp/g8AAyMAUzB0iJoaAWhJDUsMNFtvRQSArRnsvpZhODP1Q/YI7Ha4eriGRzHYrrmEI43NHvqzaQRQQMi4GRsgMQNklpzZfv0fEQEYjmcKg1nWEEALxiwHuP3qzxYB7EhgeDbbbNi8/RWx6SSvbUpq8E3zZkXA3K/FSA3If4YDw4RGN4uroCM1LNE077ypK6QGiM0wO7Pd00UAelJDIgJYBpj9O8kIwAZGWNC4uaDTLNKGDGT/QTICsA2Ds7Uve2ExMCY1U0A+7iXBOD3TxHmPNjN5yQ0Fw2e2VVLDMlNNoZUkNYSmUxoh5xNI/5cu+M/cz/AaKMuare9IpAabOw3TyabX0jx4jNTgMFKDNte8pAhg/V5NR2o4NZwG/Kp3gwiA1Uy8huQPcgocaNqaKQ3HDMvaP7qgEJjcsmo0P3MtgRGkBtvIAnz9TWXuOblJDc/vQ3kE5f79pPZIqz16YgJm/02tKKlh7dvvKtF4mkk3AGpAENZzi70jOc/UZrb/oK4jNZjQTb7/oVKJJrUFEYBKarAEqcEWpIYYcdSRSA2C1mjd2THpM3gSQLNTQyYRaO3HjQqSeW6nWYAJaF2beKb1eym0xlpGp/n2O4IlGvvLB+PUjdzsk6cpYOqLx2ff/lAhEk12M8FkrKDNBlN72DIx1DuPgASGkBpIuLuw03xf4dIY19gjiNTg4P5BVx46OLkYCk2sPHTwI/xGoVEeBCYC4YVXUGrXBlBg/7+DqRMh6TOC1ADs1+mx5rNvBJZKVNkF+UgNYumIyOV4/BE892HzRwj3/K2Rn9l5jhEkaY3JZQ1cvv6hIktjvHQm4MO76wZgWm97aQsbnLRO821FkWg3WDKYa1roVeUaB7Nz30/bqUGzSANXy/cqlkp0UmflMSI1aHdqEGBsBoYfPPD8rdGQAQ4zyWhDRAB8fwbdwgYUwCQlmpMNGKSHPUZqQN/o8z+HsRuVRzzANTF7AB8JHhkFneurD4MQfyEhNWBr5hFeQhBo5s+Zd1HAVPoePeACsIcDvPDK4ydvkHXU5FQJvBKca+hGm5yJwTUf30gerhlWTOvtc4+ub9Xs1PAqQW3+/gcNFGQDTqY5SA2qn3FkP5OkzwOzioFdxgHpSxsT9uybjcqGrmYgms2pSjYuKwIAhhWzuvOmtmidZrydfa3HgWUjqnlLAuM92jFKObXePkiCCcSam9hCDWSRN/B/OokmUykEJs2Mh8COs3A5cIwKrC4Gsp7fNcub7Vz37NhiIEZqCIi/9qWZjR/Tq4WgOQnjpAY7ldQA+Fukna34I0JDhAmn93TfKBm4vv4G2S88AaTdqcHnIc3X38Eq2VhQM1DeQftTutOsPdo36jCwlT2M25rk5gZ0HPBtihWLVU3lJw+UDab2wGhQhsBc+1lgXsYscoop491mXjaY2nPTdOH6vTeWFoy0IUIPmoBnP/4AYXCpVNKucGgDFpManPhODb6yU4PNNmAgOzWEtedPdwzyuEigx+Q7NdixA6hEjNF7ibpLRS55OhiIpi8FRF4sppFIDYoWD34AvxHUgDGW9dZ1XYqcYqQGhyeOe/9t0F2klrY7zSY1qKaZu4L4OhjgXrdYZjDdiq3SKfOHNPMhTLPiNKE23WzEy7uw2yArMC3JadYoFqP5mdZTo72avEmUo2oqGzCwscvIARAsmHOynrjiCsPXdXKFTiZtpwZ5mQ6YP85RMxU08PRC1sxc3szcjAiANzO6UwMw7/vrhJghLwdGr+GkBnquFOnIJ7mqBsUCfTJETCM1APbdIbVc7Eab3Qi8h3d3Vs3B7NypOWSshL9GITXIGxzuRpm1odRNZe6Cm/gZ0Luz01o1B9Nq1YDpmU1jZANMTDM30dG4D4qDAf3/+TjXApt9GPwbggH9SSTKagJmYyOa/AQKgvHd+eTnX1afmGNpvQ3B4p0ayB5kuH+CzQopKWtHtMwovCGf0euGGLzByplbKaSG1J0akAUK5uMoijb+eZehibW21eSHq+v7sMdodmoQ/tMTqu/XxjltAALWmLzrh76yfbUXiwWkz0gGYxrOxxXURaPo19+eGDIAW29dubCpEQD74XbzORtWOZPxro7UkBoBBD9BKOzpf/37CWdycj+zqvoZKDsPaIvOjABokx5zi5bHskVR5WTXIq4y22mGmxP0BH9443eTfgNHmOz8pewIgJ4smdfZMOhRZTJ2p1OwEAyYTqe7YxkJgfPrk2yj1rr7AOQ8fsLvV4qhgTUZNSab/ek0daeG6dTdPKk0kt5so/Hz3cwwYOcRyN6pIc5DANPNyNzPVFRT3XiMALmuBwTLCV0cr78LrdfjRhQptp1I9PiXjMp58vR5XWJSSJwK+fgJkTimtJFxI/6qhX4meY0aDdTkNue7/V0im5tj2Engx5H+Qaw3fl9dhKZ1745lsFODcJqEFW9NuUVTQall2UjUDP08gkV/zKUBcSz6FSiaX39bBOZ+YBnt1aQeP1G42xQV0mQb//r3etq4Bg6WrVQwjsb4i+Mn5nkjzlLAVKKfYVPTgmnde4AnU3y+j4C8UwNhH+D/knTE0Nu83arhZkAKbuKW7E2dFIyVO2SsCS+2V5OysQWdOn3XyC5C+WBgX/vf354kRgSr+9eGOzUofoae2VQ7uU00wgxsRD//sp+ol7uB8V5NOjAETZqJTvczWQ+kWzNROf9UW9pOz7oZGAuObYr5GcOBUBqYjY3Gr09icHa4IUsB47Mhuu3xcTsIuAbDdAuP1Bb/0Gl+5iY1g9DAODrW+XkRyUrweJLBlkgNCkOBTh1DmfaLDAcK9pn4Ndr4hfEFW603asEA33/T7AAq7JGsW0OjgoE2+ve7ONHRWr/fK+kIyv7kdmwaBUGbHrpGMLiBNhpjMQOjckfiO2+h2uzfjoXWdZzHaADauu6xIoqCiUBTR2rw1NOdxGf98W2g0ZoBGNw8ue4pRRQ8CJFawKQGSjLgvAQQ18i5FWAsBe4JY7TQmukeMLJmDE3j/3p1XsQQsx8CyogAbNPu9OMnZD9Dz222/M2ImOhb8zMMy+PNeubxE4ZOUxxCPd9gDkctk97PlAMmerxrFdt8eiEYOL5ZcsdJmGYU1fStPGCCeDOTZo44GGovwpPlDnCSYKITkeDVNjMSP5OEhkJqEMQD3NnIrtU+30AqsFDHuTUwG1FlXLN0R2oRGiU5fiKV1JDiNKlvcrHH2VheOKB2lwmjUJd9ojYFY4XvJkurnDiU6AR3lxuCcReBsbzdE21b25D+l11s7QMylsZk0/GLgBGkBp9vwOAzhgI55QGDIQwFz92cNBZY2EoJphlWy+4UaI+fYAWTjp+IkxpStpICfAMpT9wY+oHff0eSqwvLWBxM1JjMa0HKAVTxgtmUDipHAE7CNPMNYZHd43t2suyhvTt5XL4hoKFPo7LZV2bclOCXHT8RzzXncppkD1USYwN3PmmUDQeDiRrjPrBvuvl0HjA4stuslFw7OHqZ9Keg+ObTgcydiRFh6JyOE9salm8Ia/vBfKJOsdwMTBRN+iS3yvesdXxeHLEOTDnlhObNbFtDasAdJ+TEAzxscHnyQLoRTKdzNPlVit+BYWxl3J96tkhR4LdwRgQh12ODwNMt2aSG+Bbcip+J7wcAptDtlIEH1jCa353a5Z7ZlBEBKJsboIROf/MENjfU3gqaZoRkPK9LZ2n8MWDow/N3aF4vNcG2AEwUNaLJeLMvbA0HU/D4Ceg++cFqnHYckJkD+EsFZObAxZrtMs3jx6lB/+Xubo4nUSNPg0Ozn43Kybuf+s6UvA9+N30fObSNFwxrbBVhwI+fIAVz0aEG0l5NCqlB3oJJbLwk3ZjUgmDq7s7HsME1NFOvuk6CgIznu30QBIwUKdgPvv4tbCWHEalBZ5qBo9+1O7FXE/Q9jtufQ0SNx2jmUo8pwnODDdi0dvs1F+9gacmM88COmebiB1DlcJrsxvhaAPxZvQ4hjU9gJeF5TEngv6PKycm7+a5bqweU/7isA6huDIbSGm108hBs0PXafL4pZL6LIaDj1OyMRacFwPw//d2PNb/cJo0AAAAASUVORK5CYII=",
              }}
              className="w-5 h-5"
              resizeMode="contain"
            />
            <Text className=" text-lg font-rubik-medium text-black-300 ">
              Continue with Google
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
