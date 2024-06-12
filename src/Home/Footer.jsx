import {  FaPhone } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
    return (
        <footer className="footer p-10 bg-sky-200 text-base-content">
            <aside>
                <img src="https://i.ibb.co/wCv32FK/square-arrow-logo-template-614438-51.jpg" alt="" className="bg-sky-200 h-12 w-12"/>
                <h2 className="text-2xl font-semibold">AssetTrack Pro</h2>
                <p className="flex items-center gap-2"><FaMapLocation/>Dhaka-1260,Bangladesh</p>
                <p className="flex items-center gap-2"><FaPhone/>+880 1789 213 219</p>
                <p className="flex items-center gap-2"><IoMdMail />assetTrackpro12@gmail.com</p>
            </aside>
            <nav className="text-lg">
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav className="text-lg">
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav className="text-lg">
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    );
};

export default Footer;