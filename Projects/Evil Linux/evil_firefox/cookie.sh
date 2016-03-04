#Execute python script
python sql.py > cookies.txt

#Send cookies.txt via email
echo 'Here is a fresh batch of tasty session cookies!' | mailx -s 'Fresh batch of cookies!' -A /home/saurabh/cookies.txt ssingh02@bu.edu
