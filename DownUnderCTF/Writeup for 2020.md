##### OUR FIRST WRITEUP :?
- [Misc](#misc)
    - [Welcome!](#welcome)
    - [16 Home Runs](#16-home-runs)
- [Forensics](#forensics)
    - [On the spectrum](#on-the-spectrum)

# <a name="misc"></a> Misc
## <a name="welcome"></a> Welcome
Points: 100

#### Description
>Welcome to DUCTF!
>
>ssh ductf@chal.duc.tf -p 30301
>
>Password: ductf
>
>Epilepsy warning

### Solution
When you connect to the machine a bounch of messages are displayed and you can not execute any command. I tried to `scp` the whole home directory, but the script that displayed the messages on ssh connection was throwing some error. Looking more closely, the flag is displayed among the other messages.

![image](https://raw.githubusercontent.com/lightningsarp/CTF-Players/master/DownUnderCTF/images/Screenshot%20from%202020-10-09%2022-31-29.png)

Flag: DUCTF{w3lc0m3_t0_DUCTF_h4v3_fun!}

## <a name="16-home-runs"></a> 16 Home Runs
Points: 100

#### Description
>How does this string relate to baseball in anyway? What even is baseball? And how does this relate to Cyber Security? ¯(ツ)/¯
>
>`RFVDVEZ7MTZfaDBtM19ydW41X20zNG41X3J1bm4xbjZfcDQ1N182NF9iNDUzNX0=`

### Solution
I have no idea about baseball, but I know that the string looks like encoding and it's not base 16 (hex). Base64 deconding it gives us the flag.

![image](https://raw.githubusercontent.com/lightningsarp/CTF-Players/master/DownUnderCTF/images/Screenshot%20from%202020-10-09%2022-14-58.png)

Flag: DUCTF{16_h0m3_run5_m34n5_runn1n6_p457_64_b4535}

# Rot-i - CRYPTO - 100pts.
## Description
ROT13 is boring!

```
Ypw'zj zwufpp hwu txadjkcq dtbtyu kqkwxrbvu! Mbz cjzg kv IAJBO{ndldie_al_aqk_jjrnsxee}. Xzi utj gnn olkd qgq ftk ykaqe uei mbz ocrt qi ynlu, etrm mff'n wij bf wlny mjcj :).
```

## Solution
The cipher is a ROT-n where, unlike the ROT13, the rotation `n` is given by the __position__ of the character in the string starting from 0.
So the 1st character wouldn't have any rotation, the 2nd would have 1, the 3rd 2 and so on.

To decode the message i wrote this simple python script:

```python3
#!/usr/bin/python3

alphabet = "abcdefghijklmnopqrstuvwxyz"
rot = 0
out = ""

with open('challenge.txt') as f:
	
	cipher = f.readline().lower()
	
	for c in cipher:
		if c in alphabet: out += alphabet[alphabet.find(c)-rot%26]
		else: out += c

		rot += 1

	print(out)
```
Output:
```
you've solved the beginner crypto challenge! the flag is ductf{crypto_is_fun_kjqlptzy}. now get out some pen and paper for the rest of them, they won't all be this easy :).
```
Flag: `DUCTF{crypto_is_fun_kjqlptzy}`

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
