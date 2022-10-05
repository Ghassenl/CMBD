CREATE TABLE servers (
	id 		INTEGER NOT NULL PRIMARY KEY,
	type		TEXT NOT NULL, -- must be 'virtual' or 'physical'
	ram		INTEGER NOT NULL, -- in gigabytes, must be less than 256
	cpu_count	INTEGER NOT NULL, -- must be less than 64
	hostname	TEXT NOT NULL
);

CREATE TABLE raids (
	id 		INTEGER NOT NULL PRIMARY KEY,
	raid_type	INTEGER NOT NULL -- must be 0, 1, 5 or 6
);

CREATE TABLE disks (
	id 		INTEGER NOT NULL PRIMARY KEY,
	type		TEXT NOT NULL, -- must be ssd or hdd
	size		INTEGER NOT NULL, -- in gigabytes
	id_raid		INTEGER,
	id_server	INTEGER NOT NULL,
	FOREIGN KEY(id_raid) REFERENCES raids(id),
	FOREIGN KEY(id_server) REFERENCES SERVERS(id)
);

CREATE TABLE partitions (
	id 		INTEGER NOT NULL PRIMARY KEY,
	fs_format	TEXT NOT NULL, -- must be ext4, ntfs or xfs
	size		INTEGER NOT NULL, -- must be less than its disk size
	id_disk		INTEGER NOT NULL,
	FOREIGN KEY(id_disk) REFERENCES disks(id)
);

CREATE TABLE network_interfaces (
	id		INTEGER NOT NULL PRIMARY KEY,
	ip		text NOT NULL, -- must be in ip format
	mask		text NOT NULL, -- must be a subnet mask
	id_gateway	INTEGER,
	FOREIGN KEY(id_gateway) REFERENCES servers(id)
);

CREATE TABLE sec_groups (
	id		INTEGER NOT NULL PRIMARY KEY,
	name		text UNIQUE NOT NULL
);

CREATE TABLE sec_rules (
	id		INTEGER NOT NULL PRIMARY KEY,
	port		INTEGER NOT NULL,
	direction	TEXT NOT NULL, -- must be IN or OUT
	destination	TEXT,
	policy		TEXT NOT NULL, -- must be ACCEPT, REJECT or DESTROY
	id_sec_group	INTEGER NOT NULL, -- must go in default group if not specified
	FOREIGN KEY(id_sec_group) REFERENCES sec_groups(id)
);

CREATE TABLE sec_groups_servers (
	id		INTEGER NOT NULL PRIMARY KEY,
	id_sec_group	INTEGER NOT NULL,
	id_server	INTEGER NOT NULL,
	FOREIGN KEY(id_sec_group) REFERENCES sec_groups(id),
	FOREIGN KEY(id_server) REFERENCES servers(id)
);

	
	
