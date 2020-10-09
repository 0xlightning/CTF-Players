##### OUR FIRST WRITEUP :?
- [Misc](#misc)
    - [Welcome!](#welcome)
    - [16 Home Runs](#16-home-runs)
- [Forensics](#forensics)
    - [On the spectrum](#on-the-spectrum)
- [Crypto](#crypto)
    - [rot-i](#rot-i)
- [Reversing](#reversing)
    - [Formatting](#formatting)

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

![image](https://user-images.githubusercontent.com/38787278/93643510-cc26d200-fa08-11ea-9337-6bfcd3bc6677.png)

Flag: DUCTF{m4bye_n0t_s0_h1dd3n}

# <a name="crypto"></a> Crypto
## <a name="rot-i"></a> rot-i
Points: 100

#### Description
ROT13 is boring!

Attached files:

    challenge.txt (sha256: ab443133665f34333aa712ab881b6d99b4b01bdbc8bb77d06ba032f8b1b6d62d)

### Solution
We recieve a file with the next content: `Ypw'zj zwufpp hwu txadjkcq dtbtyu kqkwxrbvu! Mbz cjzg kv IAJBO{ndldie_al_aqk_jjrnsxee}. Xzi utj gnn olkd qgq ftk ykaqe uei mbz ocrt qi ynlu, etrm mff'n wij bf wlny mjcj :).`
We know it's a form of ROT, but which one? Well, it's an incrementing one, starting from ROT-0 actually. I extracted only the encoded flag and I used the next script for deconding it:

```python
import string

flag_enc = "IAJBO{ndldie_al_aqk_jjrnsxee}"
flag_dec = []
k = 0

def make_rot_n(n, s):
    lc = string.ascii_lowercase
    uc = string.ascii_uppercase
    trans = str.maketrans(lc + uc, lc[n:] + lc[:n] + uc[n:] + uc[:n])
    return str.translate(s, trans)

for i in reversed(range(22 - len(flag_enc), 22)):
    flag_dec.append(make_rot_n(i, flag_enc[k]))
    k += 1

print(''.join(flag_dec))
```

Flag: DUCTF{crypto_is_fun_kjqlptzy}

# <a name="reversing"></a> Reversing
## <a name="formatting"></a> Formatting
Points: 100

#### Description
>Its really easy, I promise
>
>Files: formatting

### Solution
The file received is a 64 bits ELF binary.

![image](https://user-images.githubusercontent.com/38787278/93664106-1c3b7e00-fa75-11ea-9d5c-0b5d2a63dee0.png)

Running `strings` on it gives us some clues, but not the entire flag. I opened the bynary in [Radare2](https://github.com/radareorg/radare2) to better analyze it. I guess you can get the flag in simpler ways, but I'm trying to get better with this tool.

I opened it with `r2 -d formatting`, analyzed it with `aaa` and looked over the assembly.

![image](https://user-images.githubusercontent.com/38787278/93664244-01b5d480-fa76-11ea-9ccb-ef7373277bd2.png)

I saw multiple times characters are inserted in `var_90h` so I assumed that's the flag. I set a breakpoint on `lea rax, [var_90h]` and one one `mov byte [rbp + rax - 0x90], dl`. After the first breakpoint the `var_90h` contained only `DUCTF{`.

![image](https://user-images.githubusercontent.com/38787278/93664333-bf40c780-fa76-11ea-8d82-55cc2f9e36c3.png)

However, after the second breakpoint we get the flag.

![image](https://user-images.githubusercontent.com/38787278/93664376-0dee6180-fa77-11ea-9d9c-07c8c1f224b4.png)

Flag: DUCTF{d1d_You_Just_ltrace_296faa2990acbc36}
