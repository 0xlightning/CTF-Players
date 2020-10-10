# OUR FIRST WRITEUP :?
- [Web](#web)
    - [Leggos](#leggos)
- [Misc](#misc)
    - [Welcome!](#welcome)
    - [16 Home Runs](#16-home-runs)
    - [Tim Tams](#Tim Tams)
- [Forensics](#forensics)
    - [On the spectrum](#on-the-spectrum)


# <a name="web"></a> Web
## <a name="leggos"></a> Leggos
Points: 100

#### Description
>I <3 Pasta! I won't tell you what my special secret sauce is though!
>
>https://chal.duc.tf:30101

### Solution
We are prompted with a page containing some text and an image. Trying to view the source HTML we notice that we can't do a Right Click. 

![image](https://raw.githubusercontent.com/lightningsarp/CTF-Players/master/DownUnderCTF/images/web.png)

No problem, we append in the URL `view-source:`, so it becomes `view-source:https://chal.duc.tf:30101/`. Inside the HTML we have a hint saying `<!-- almost there -->`. We open the source code of an imported JS file and we get the flag.

![image](https://raw.githubusercontent.com/lightningsarp/CTF-Players/master/DownUnderCTF/images/web2.png)

Flag: DUCTF{n0_k37chup_ju57_54uc3_r4w_54uc3_9873984579843}

# <a name="misc"></a> Misc
## <a name="welcome"></a> Welcome
Points: 100

#### Description
>Welcome to DUCTF!
>
>ssh ductf@chal.duc.tf -p 30301
>
>Password: ductf


### Solution
When you connect to the machine a bounch of messages are displayed and you can not execute any command. I tried to `scp` the whole home directory, but the script that displayed the messages on ssh connection was throwing some error. Looking more closely, the flag is displayed among the other messages.

![image](https://raw.githubusercontent.com/lightningsarp/CTF-Players/master/DownUnderCTF/images/Screenshot%20from%202020-10-09%2022-31-29.png)

Flag: DUCTF{w3lc0m3_t0_DUCTF_h4v3_fun!}

## <a name="16 Home Runs"></a> 16 Home Runs
Points: 100

#### Description
>How does this string relate to baseball in anyway? What even is baseball? And how does this relate to Cyber Security? ¯(ツ)/¯
>
>`RFVDVEZ7MTZfaDBtM19ydW41X20zNG41X3J1bm4xbjZfcDQ1N182NF9iNDUzNX0=`

### Solution
I have no idea about baseball, but I know that the string looks like encoding and it's not base 16 (hex). Base64 deconding it gives us the flag.

![image](https://raw.githubusercontent.com/lightningsarp/CTF-Players/master/DownUnderCTF/images/Screenshot%20from%202020-10-09%2022-14-58.png)

Flag: DUCTF{16_h0m3_run5_m34n5_runn1n6_p457_64_b4535}

## <a name="Tim Tams"></a>Tim Tams

``` When I eat too many Tim Tams, I get rather slow!

WARNING You will want to turn down your audio for this one!

Download: https://storage.googleapis.com/files.duc.tf/uploads/Clive.wav

File Hash (SHA256): 4C1CC12D002956A83E168CA650B776B55AAC36F2131D0DF617BE7D55DBEF93D1 
```
#### Description

We are given a really noisy wav audio file, I had no clue of solving this at first when my regular audio steganography tools failed. But my teammate came into play with a really good suggestion. **QSSTV !**

https://storage.googleapis.com/files.duc.tf/uploads/Clive.wav

**QSSTV** is a utility for dealing with slow scan television signals. From the challenge description, we can pick out a hint “When I eat too many Tim Tams, I get rather slow!”.

I used the following commands to setup qsstv on linux

```
sudo apt-get install pavucontrol
sudo apt-get install qsstv
```

We need the pavucontrol utility to be able to open audio files.

Type qsstv on the terminal to open the program and select the audio file you’re going to work with

![image](https://raw.githubusercontent.com/lightningsarp/CTF-Players/master/DownUnderCTF/images/tim%20tams.png)

qsstv maps the wav audio into an image and we can see at the top left what appears to be an encoded flag.`QHGPS{UHZOYR_Z3Z3_1BEQ}`

This is ROT13, we decode the flag to: `DUTCF{HUMBLE_M3M3_1ORD}`

Flag: DUTCF{HUMBLE_M3M3_1ORD}

# <a name="forensics"></a> Forensics
## <a name="on-the-spectrum"></a> On the spectrum
Points: 100

#### Description
>My friend has been sending me lots of WAV files, I think he is trying to communicate with me, what is the message he sent?
>
>Author: scsc
>
>Attached files:
>
>   message_1.wav (sha256: 069dacbd6d6d5ed9c0228a6f94bbbec4086bcf70a4eb7a150f3be0e09862b5ed)

### Solution
We get a `.wav` file and, as the title suggest, we might find the flag in the spectogram. For viewing it I used [Sonic Visualizer](https://sonicvisualiser.org/). I played a little with the settings to view it better.

![image](https://raw.githubusercontent.com/lightningsarp/CTF-Players/master/DownUnderCTF/images/On%20the%20spectrum.png)

Flag: DUCTF{m4bye_n0t_s0_h1dd3n}
