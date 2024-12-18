import sys
import pandas as pd
from scapy.all import rdpcap, IP, TCP, UDP, ICMP, Ether, Raw, ARP

def process_pcap_to_csv(input_file, output_file):
    try:
        packets = rdpcap(input_file)  # Read the PCAP file
        data = []

        for pkt in packets:
            # Initialize packet_info with default values
            packet_info = {
                "time": pkt.time,
                "frame_length": len(pkt),
                "src_mac": "N/A",
                "dst_mac": "N/A",
                "src_ip": "N/A",
                "dst_ip": "N/A",
                "ttl": "N/A",
                "ip_flags": "N/A",
                "fragment_offset": "N/A",
                "protocol": "N/A",
                "src_port": "N/A",
                "dst_port": "N/A",
                "tcp_flags": "N/A",
                "window_size": "N/A",
                "icmp_type": "N/A",
                "icmp_code": "N/A",
                "payload_length": "N/A",
                "src_bytes": 0,  # New field
                "dst_bytes": 0   # New field
            }

            # Layer 2: Ethernet
            if pkt.haslayer(Ether):
                packet_info["src_mac"] = pkt[Ether].src
                packet_info["dst_mac"] = pkt[Ether].dst

            # Layer 3: IP
            if pkt.haslayer(IP):
                packet_info["src_ip"] = pkt[IP].src
                packet_info["dst_ip"] = pkt[IP].dst
                packet_info["ttl"] = pkt[IP].ttl
                packet_info["ip_flags"] = pkt[IP].flags
                packet_info["fragment_offset"] = pkt[IP].frag
                packet_info["protocol"] = pkt[IP].proto

            # Layer 4: TCP
            if pkt.haslayer(TCP):
                packet_info["src_port"] = pkt[TCP].sport
                packet_info["dst_port"] = pkt[TCP].dport
                packet_info["tcp_flags"] = pkt[TCP].flags
                packet_info["window_size"] = pkt[TCP].window
                packet_info["payload_length"] = len(pkt[TCP].payload)
                packet_info["src_bytes"] = len(pkt[TCP])  # TCP layer bytes
                packet_info["dst_bytes"] = len(pkt[TCP].payload)  # Payload bytes

            # Layer 4: UDP
            elif pkt.haslayer(UDP):
                packet_info["src_port"] = pkt[UDP].sport
                packet_info["dst_port"] = pkt[UDP].dport
                packet_info["payload_length"] = len(pkt[UDP].payload)
                packet_info["src_bytes"] = len(pkt[UDP])  # UDP layer bytes
                packet_info["dst_bytes"] = len(pkt[UDP].payload)  # Payload bytes

            # Layer 4: ICMP
            elif pkt.haslayer(ICMP):
                packet_info["icmp_type"] = pkt[ICMP].type
                packet_info["icmp_code"] = pkt[ICMP].code
                packet_info["src_bytes"] = len(pkt[ICMP])  # ICMP layer bytes

            # Layer 2: ARP
            if pkt.haslayer(ARP):
                packet_info["src_ip"] = pkt[ARP].psrc
                packet_info["dst_ip"] = pkt[ARP].pdst

            # Raw payload extraction
            if pkt.haslayer(Raw):
                packet_info["payload_length"] = len(pkt[Raw].load)
                packet_info["src_bytes"] += len(pkt[Raw].load)  # Add Raw payload bytes

            data.append(packet_info)

        # Convert to DataFrame and save to CSV
        df = pd.DataFrame(data)
        df.to_csv(output_file, index=False)
        print(f"CSV file created successfully at {output_file}")

    except Exception as e:
        print(f"Error processing PCAP file: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python pcaptocsv.py <input_pcap_file> <output_csv_file>")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]
    process_pcap_to_csv(input_file, output_file)
