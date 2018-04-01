#!/bin/bash

export PORT=5350
export MIX_ENV=prod
export GIT_PATH=/home/task3/src/task3

PWD=`pwd`
if [ $PWD != $GIT_PATH ]; then
	echo "Error: Must check out git repo to $GIT_PATH"
	echo "  Current directory is $PWD"
	exit 1
fi

if [ $USER != "task3" ]; then
	echo "Error: must run as user 'task3'"
	echo "  Current user is $USER"
	exit 2
fi

mix deps.get
(cd assets && npm install)
(cd assets && ./node_modules/brunch/bin/brunch b -p)
mix phx.digest
mix release --env=prod

mkdir -p ~/www
mkdir -p ~/old

NOW=`date +%s`
if [ -d ~/www/task3 ]; then
	echo mv ~/www/task3 ~/old/$NOW
	mv ~/www/task3 ~/old/$NOW
fi

mkdir -p ~/www/task3
REL_TAR=~/src/task3/_build/prod/rel/task3/releases/0.0.1/task3.tar.gz
(cd ~/www/task3 && tar xzvf $REL_TAR)

crontab - <<CRONTAB
@reboot bash /home/task3/src/task3/start.sh
CRONTAB

#. start.sh
